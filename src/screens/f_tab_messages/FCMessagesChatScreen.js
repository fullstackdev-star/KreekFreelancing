import React, {Component} from 'react';
import {
  ActivityIndicator,
  Alert,
  Animated,
  BallIndicator,
  BackHandler,
  Button,
  Clipboard,
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  LayoutAnimation,
  Linking,
  LogBox,
  Modal,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import {SearchBar} from 'react-native-elements';
import GHeaderBar from '../../components/GHeaderBar';
import RestAPI from '../../DB/RestAPI';
import Constants from '../../DB/Constants';

import DateTimePicker from '@react-native-community/datetimepicker';
import {IconButton} from 'react-native-paper';
var Sound = require('react-native-sound');

import {GStyle, GStyles, Global, Helper} from '../../utils/Global/index';
import {Dropdown} from '../../lib/MaterialDropdown/index';
import {TextField} from '../../lib/MaterialTextField/index';
import Accordion from '../../lib/Collapsible/Accordion';
import Video from 'react-native-video';

const ic_send = require('../../assets/images/ic_send.png');

import {GiftedChat, Actions, Send, Bubble} from 'react-native-gifted-chat';
import CustomActions from '../../components/elements/MessageActions';
import CustomView from '../../components/elements/MessageView';

const local_messages = require('./data/messages.js');
const local_old_messages = require('./data/old_messages.js');

const WINDOW_WIDTH = Helper.getContentWidth();

class FCMessagesChatScreen extends Component {
  constructor(props) {
    super(props);

    console.log('FCMessagesChatScreen start');

    this.init();
  }

  componentDidMount() {
    this._isMounted = true;

    this.onRefresh('init');

    this._fetchNewTimer = setInterval(() => {
      this.onFetchNewMessages();
    }, 10000);
  }

  componentWillUnmount() {
    clearInterval(this._fetchNewTimer);

    this._isMounted = false;
  }

  init = () => {
    this.state = {
      isFetching: false,
      totalCount: 0,

      messages: [],

      typingText: null,
    };

    this._isMounted = false;

    Sound.setCategory('Playback');
  };

  onRefresh = (type) => {
    let {isFetching, totalCount, messages} = this.state;

    if (isFetching) {
      return;
    }

    if (global.isLocal) {
      this.setState({isFetching: true});
      setTimeout(() => {
        if (this._isMounted) {
          this.setState((oldState) => {
            return {
              messages: GiftedChat.prepend(
                oldState.messages,
                local_old_messages,
              ),
              isFetching: false,
            };
          });
        }
      }, 3000);

      messages = local_messages;
      this.setState({messages});
    } else {
      let lastMessageId = 0;
      if (type == 'more') {
        if (messages.length < totalCount) {
          lastMessageId = messages[messages.length - 1]._id;
        } else {
          return;
        }
      }

      let params;
      if (type == 'init') {
        params = {
          opponent_id: global._roomId,
          count_per_page: Constants.COUNT_PER_PAGE,
        };
      } else {
        params = {
          opponent_id: global._roomId,
          last_message_id: lastMessageId,
          count_per_page: Constants.COUNT_PER_PAGE,
        };
      }
      if (type == 'init') {
        showPageLoader(true);
      } else {
        this.setState({isFetching: true});
      }
      RestAPI.get_message_list(params, (json, err) => {
        if (type == 'init') {
          showPageLoader(false);
        } else {
          this.setState({isFetching: false});
        }

        if (err !== null) {
          Helper.alertNetworkError();
        } else {
          if (json.status === 1) {
            this.setState({totalCount: json.data.total_count});
            if (type == 'init') {
              this.onReceive(json.data.message_list);
            } else {
              this.onLoadMore(json.data.message_list);
            }
          } else {
            Helper.alertServerDataError();
          }
        }
      });
    }
  };

  onBack = () => {
    clearInterval(this._fetchNewTimer);

    this.props.navigation.goBack();
  };

  onFetchNewMessages = () => {
    const {isFetching} = this.state;

    if (isFetching) {
      return;
    }
    let params = {
      opponent_id: global._roomId,
    };
    RestAPI.get_new_message(params, (json, err) => {
      if (err !== null) {
        Helper.alertNetworkError();
      } else {
        if (json.status === 1) {
          this.setState({totalCount: json.data.total_count});
          this.onReceive(json.data.message_list);
        } else {
          Helper.alertServerDataError();
        }
      }
    });
  };

  onSend = (messages = []) => {
    if (global.isLocal) {
      this.setState((oldState) => {
        return {messages: GiftedChat.append(oldState.messages, messages)};
      });

      this.onLocalReply(messages);
    } else {
      if (messages.length > 0) {
        let params = {
          opponent_id: this._opponentId,
          message_type: 'text',
          message: messages[0].text,
        };
        showPageLoader(true);
        RestAPI.send_message(params, (json, err) => {
          showPageLoader(false);

          if (err !== null) {
            Helper.alertNetworkError();
          } else {
            if (json.status === 1) {
              this.setState({totalCount: json.data.total_count});
              this.onReceive(json.data.message_list);
            } else {
              Helper.alertServerDataError();
            }
          }
        });
      }
    }
  };

  onPlaySound = (value) => {
    const track = new Sound(value, null, (e) => {
      if (e) {
        console.log('error loading track:', e);
      } else {
        track.play();
      }
    });
  };

  onReceive = (message_list = []) => {
    let messages = [];
    message_list.forEach((item) => {
      if (item.sender_id != global.me.user_id) {
        this._opponentId = item.sender_id;
      }

      const newItem = {
        _id: item.message_id,
        text: item.message,
        createdAt: new Date(item.time),
        user: {
          _id: item.sender_id == global.me.user_id ? 1 : item.sender_id,
          name: item.sender_name,
          avatar: item.sender_photo,
        },
      };
      messages.push(newItem);
    });

    this.setState((oldState) => {
      return {
        messages: GiftedChat.append(oldState.messages, messages),
      };
    });
  };

  onLoadMore = (message_list = []) => {
    let messages = [];
    message_list.forEach((item) => {
      if (item.message) {
        if (item.sender_id != global.me.user_id) {
          this._opponentId = item.sender_id;
        }

        const newItem = {
          _id: item.message_id,
          text: item.message,
          createdAt: new Date(item.time),
          user: {
            _id: item.sender_id == global.me.user_id ? 1 : item.sender_id,
            name: item.sender_name,
            avatar: item.sender_photo,
          },
        };
        messages.push(newItem);
      }
    });

    this.setState((oldState) => {
      return {
        messages: GiftedChat.prepend(oldState.messages, messages),
      };
    });
  };

  onLocalReply(messages) {
    if (messages.length > 0) {
      this.setState({typingText: 'Dick is typing...'});
    }

    setTimeout(() => {
      if (messages.length > 0) {
        if (messages[0].image) {
          this.onLocalReceive('Nice picture!');
        } else if (messages[0].location) {
          this.onLocalReceive('My favorite place');
        } else {
          this.onLocalReceive('Alright');
        }
      }
      this.setState({typingText: null});
    }, 5000);
  }

  onLocalReceive = (text) => {
    this.setState((oldState) => {
      return {
        messages: GiftedChat.append(oldState.messages, {
          _id: Math.round(Math.random() * 1000000),
          text: text,
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar:
              'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50',
          },
        }),
      };
    });
  };

  scrollToBottomComponent = () => {
    return (
      <View style={styles.bottomComponentContainer}>
        <IconButton
          icon="chevron-double-down"
          size={36}
          color={GStyle.activeColor}
        />
      </View>
    );
  };

  render() {
    const {messages, isFetching} = this.state;

    isLoadEarlier = messages.length > 0 ? true : false;

    return (
      <>
        <SafeAreaView style={GStyles.statusBar} />
        <SafeAreaView style={{...GStyles.container}}>
          {this._renderHeader()}
          <View
            style={{
              flex: 1,
              width: '95%',
            }}>
            <GiftedChat
              messages={messages}
              onSend={this.onSend}
              loadEarlier={isLoadEarlier}
              onLoadEarlier={() => {
                this.onRefresh('more');
              }}
              isLoadingEarlier={isFetching}
              user={{_id: 1, name: 'Dick Arnold'}}
              renderBubble={this._renderBubble}
              placeholder="Type your message here..."
              showUserAvatar
              alwaysShowSend
              renderSend={this._renderSend}
              scrollToBottom
              scrollToBottomComponent={this.scrollToBottomComponent}
              renderCustomView={this._renderCustomView}
              // renderActions={this._renderCustomActions}
              renderMessageVideo={this._renderMessageVideo}
              renderMessageAudio={this._renderMessageAudio}
              renderFooter={this._renderFooter}
            />
          </View>
        </SafeAreaView>
      </>
    );
  }

  _renderHeader = () => {
    return (
      <GHeaderBar
        headerTitle={global._opponentName}
        leftType="back"
        onPressLeftButton={this.onBack}
      />
    );
  };

  _renderCustomActions = (props) => {
    return <CustomActions {...props} />;
  };

  _renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: {
            backgroundColor: GStyle.grayBackColor,
          },
          right: {
            backgroundColor: GStyle.activeColor,
          },
        }}
      />
    );
  };

  _renderSend = (props) => {
    return (
      <Send {...props}>
        <View
          style={{
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 14,
          }}>
          <Image source={ic_send} style={{...GStyles.image, width: 24}}></Image>
        </View>
      </Send>
    );
  };

  _renderCustomView(props) {
    return <CustomView {...props} />;
  }

  _renderMessageVideo = (props) => {
    const {currentMessage} = props;
    return (
      <View
        style={{
          width: 150,
          height: 100,
          borderRadius: 13,
          overflow: 'hidden',
          margin: 3,
          borderWidth: 1,
          borderColor: 'red',
        }}>
        <Video
          source={{uri: currentMessage.video}} // Can be a URL or a local file.
          ref={(ref) => {
            this.player = ref;
          }} // Store reference
          resizeMode="cover"
          onBuffer={this.onBuffer} // Callback when remote video is buffering
          onError={this.videoError} // Callback when video cannot be loaded
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
          }}
        />
      </View>
    );
  };

  _renderMessageAudio = (props) => {
    const {currentMessage} = props;
    return (
      <View
        style={{
          width: 150,
          height: 50,
          borderRadius: 13,
          margin: 3,
          justifyContent: 'center',
          alignItems: 'center',
          borderWidth: 1,
          borderColor: 'red',
        }}>
        <TouchableOpacity
          onPress={() => {
            this.onPlaySound(currentMessage.audio);
          }}>
          <Text>Play</Text>
        </TouchableOpacity>
      </View>
    );
  };

  _renderFooter = (props) => {
    if (this.state.typingText) {
      return (
        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>{this.state.typingText}</Text>
        </View>
      );
    }
    return null;
  };
}

const styles = StyleSheet.create({
  footerContainer: {
    marginTop: 5,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  footerText: {
    fontSize: 14,
    color: '#aaa',
  },
});

export default FCMessagesChatScreen;
