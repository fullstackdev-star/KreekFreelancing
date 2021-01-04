import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import TestScreen from '../screens/test/TestScreen';
import TempScreen from '../screens/test/TempScreen';

import StartScreen from '../screens/StartScreen';
import SplashScreen from '../screens/SplashScreen';
import NFWelcomeScreen from '../screens/NFWelcomeScreen';
import NCWelcomeScreen from '../screens/NCWelcomeScreen';
import FMainTabNavigator from './FMainTabNavigator';
import CMainTabNavigator from './CMainTabNavigator';

import FTutorialScreen from '../screens/FTutorialScreen';
import FCSigninScreen from '../screens/auth/FCSigninScreen';
import FCSignupScreen from '../screens/auth/FCSignupScreen';
import FCForgetPasswordScreen from '../screens/auth/FCForgetPasswordScreen';
import FCRecoverPasswordScreen from '../screens/auth/FCRecoverPasswordScreen';
import FCRecoverPasswordSuccessScreen from '../screens/auth/FCRecoverPasswordSuccessScreen';
import FCVerifyEmailScreen from '../screens/auth/FCVerifyEmailScreen';
import FCVerifyEmailSuccessScreen from '../screens/auth/FCVerifyEmailSuccessScreen';
import FCAccountStep1Screen from '../screens/auth/FCAccountStep1Screen';
import FCAccountStep2Screen from '../screens/auth/FCAccountStep2Screen';
import FMembershipScreen from '../screens/auth/FMembershipScreen';
import CMembershipScreen from '../screens/auth/CMembershipScreen';
import FCConfirmPaymentScreen from '../screens/auth/FCConfirmPaymentScreen';
import FCPaymentSuccessScreen from '../screens/auth/FCPaymentSuccessScreen';

import CTutorialScreen from '../screens/CTutorialScreen';

import FCProjectsDetailScreen from '../screens/f_tab_projects/FCProjectsDetailScreen';
import FProejctsMatchesScreen from '../screens/f_tab_projects/FProejctsMatchesScreen';
import FProjectsFilterScreen from '../screens/f_tab_projects/FProjectsFilterScreen';
import FProjectsClientDetailScreen from '../screens/f_tab_projects/FProjectsClientDetailScreen';
import FProjectsApplyScreen from '../screens/f_tab_projects/FProjectsApplyScreen';
import FProjectsClientProfileScreen from '../screens/f_tab_projects/FProjectsClientProfileScreen';

import FRequestsPastInterviewScreen from '../screens/f_tab_requests/FRequestsPastInterviewScreen';
import FRequestsInterviewUnconfirmedScreen from '../screens/f_tab_requests/FRequestsInterviewUnconfirmedScreen';
import FRequestsInterviewAcceptedScreen from '../screens/f_tab_requests/FRequestsInterviewAcceptedScreen';
import FRequestsInterviewCompletedScreen from '../screens/f_tab_requests/FRequestsInterviewCompletedScreen';
import FRequestsInviteUnconfirmedScreen from '../screens/f_tab_requests/FRequestsInviteUnconfirmedScreen';
import FRequestsInviteAcceptedScreen from '../screens/f_tab_requests/FRequestsInviteAcceptedScreen';

import FCMoreProfileScreen from '../screens/f_tab_more/FCMoreProfileScreen';
import FCMoreEditProfileScreen from '../screens/f_tab_more/FCMoreEditProfileScreen';
import FCMoreVerifyIDScreen from '../screens/f_tab_more/FCMoreVerifyIDScreen';
import FMoreMyWatchlistTabScreen from '../screens/f_tab_more/FMoreMyWatchlistTabScreen';
import FMoreJobDetailsScreen from '../screens/f_tab_more/FMoreJobDetailsScreen';
import FMoreMyStatsScreen from '../screens/f_tab_more/FMoreMyStatsScreen';
import FMorePaymentsTabScreen from '../screens/f_tab_more/FMorePaymentsTabScreen';
import FMoreCreateInvoiceSelectScreen from '../screens/f_tab_more/FMoreCreateInvoiceSelectScreen';
import FMoreCreateInvoiceSendScreen from '../screens/f_tab_more/FMoreCreateInvoiceSendScreen';
import FMorePaymentsAddCardScreeen from '../screens/f_tab_more/FMorePaymentsAddCardScreeen';
import FMoreUpdateJobProfileScreen from '../screens/f_tab_more/FMoreUpdateJobProfileScreen';
import FMoreInviteFriendScreen from '../screens/f_tab_more/FMoreInviteFriendScreen';
import FMoreNotificationsTabScreen from '../screens/f_tab_more/FMoreNotificationsTabScreen';
import FCMoreNotificationsScreen from '../screens/f_tab_more/FCMoreNotificationsScreen';
import FMoreInviteFriendNextScreen from '../screens/f_tab_more/FMoreInviteFriendNextScreen';
import FMoreSettingsScreen from '../screens/f_tab_more/FMoreSettingsScreen';

import CHomeJobsTabScreen from '../screens/c_tab_home/CHomeJobsTabScreen';
import CHomeFavoritesScreen from '../screens/c_tab_home/CHomeFavoritesScreen';
import CHomeNotificationsTabScreen from '../screens/c_tab_home/CHomeNotificationsTabScreen';
import CHomePostJobStep1Screen from '../screens/c_tab_home/CHomePostJobStep1Screen';
import CHomePostJobStep2Screen from '../screens/c_tab_home/CHomePostJobStep2Screen';
import CHomePostJobStep3Screen from '../screens/c_tab_home/CHomePostJobStep3Screen';
import CHomePostJobStep4Screen from '../screens/c_tab_home/CHomePostJobStep4Screen';
import CHomeRecentProposalsScreen from '../screens/c_tab_home/CHomeRecentProposalsScreen';

import CProfessionalsProfileScreen from '../screens/c_tab_professionals/CProfessionalsProfileScreen';
import CFindPortfolioDetailsScreen from '../screens/c_tab_professionals/CFindPortfolioDetailsScreen';
import CFindWriteReviewScreen from '../screens/c_tab_professionals/CFindWriteReviewScreen';
import CProfessionalsRequestInterviewStep1Screen from '../screens/c_tab_professionals/CProfessionalsRequestInterviewStep1Screen';
import CProfessionalsRequestInterviewStep2Screen from '../screens/c_tab_professionals/CProfessionalsRequestInterviewStep2Screen';
import CProfessionalsRequestInterviewStep3Screen from '../screens/c_tab_professionals/CProfessionalsRequestInterviewStep3Screen';
import CProfessionalsRequestInterviewStep4Screen from '../screens/c_tab_professionals/CProfessionalsRequestInterviewStep4Screen';
import CProfessionalsRequestInterviewStep5Screen from '../screens/c_tab_professionals/CProfessionalsRequestInterviewStep5Screen';
import CFindSendOfferScreen from '../screens/c_tab_professionals/CFindSendOfferScreen';

import CMRequestsPastInterviewScreen from '../screens/c_tab_more/CMRequestsPastInterviewScreen';
import CMRequestsInterviewUnconfirmedScreen from '../screens/c_tab_more/CMRequestsInterviewUnconfirmedScreen';
import CMRequestsInterviewAcceptedScreen from '../screens/c_tab_more/CMRequestsInterviewAcceptedScreen';
import CMRequestsInterviewCompletedScreen from '../screens/c_tab_more/CMRequestsInterviewCompletedScreen';

import CProjectsDetailsTabScreen from '../screens/c_tab_projects/CProjectsDetailsTabScreen';
import CProjectsFilesUploadScreen from '../screens/c_tab_projects/CProjectsFilesUploadScreen';

import FCMessagesChatScreen from '../screens/f_tab_messages/FCMessagesChatScreen';

import CMoreRequestsTabScreen from '../screens/c_tab_more/CMoreRequestsTabScreen';
import CMoreJobDetailScreen from '../screens/c_tab_more/CMoreJobDetailScreen';
import CMorePaymentsTabScreen from '../screens/c_tab_more/CMorePaymentsTabScreen';
import CMoreNoSelectCardScreen from '../screens/c_tab_more/CMoreNoSelectCardScreen';
import CMorePaymentsAddCardScreeen from '../screens/c_tab_more/CMorePaymentsAddCardScreeen';
import CMoreSelectCardScreen from '../screens/c_tab_more/CMoreSelectCardScreen';
import CMorePaymentSuccessScreen from '../screens/c_tab_more/CMorePaymentSuccessScreen';
import CMoreSettingsScreen from '../screens/c_tab_more/CMoreSettingsScreen';
import CMorePayInoviceScreen from '../screens/c_tab_more/CMorePayInoviceScreen';
import CMorePayPaystackScreen from '../screens/c_tab_more/CMorePayPaystackScreen';

// import WorkScreen from '../screens/modal/CProfessionalsSendOfferModal';
// import WorkScreen from '../screens/auth/FCAccountStep1Screen';
import WorkScreen from '../screens/f_tab_messages/FCMessagesChatScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShown: false, gestureEnabled: false}}>
        {/* <Stack.Screen name="test" component={TestScreen} /> */}
        {/* <Stack.Screen name="temp" component={TempScreen} /> */}

        {/* --- start --- */}
        <Stack.Screen name="splash" component={SplashScreen} />
        <Stack.Screen name="work" component={WorkScreen} />
        <Stack.Screen name="start" component={StartScreen} />
        <Stack.Screen name="nf_welcome" component={NFWelcomeScreen} />
        <Stack.Screen
          name="f_main_tab_navigator"
          component={FMainTabNavigator}
        />
        <Stack.Screen name="nc_welcome" component={NCWelcomeScreen} />
        <Stack.Screen
          name="c_main_tab_navigator"
          component={CMainTabNavigator}
        />

        {/* --- freelancer Auth --- */}
        <Stack.Screen name="f_main" component={FTutorialScreen} />
        <Stack.Screen name="fc_signin" component={FCSigninScreen} />
        <Stack.Screen name="fc_signup" component={FCSignupScreen} />
        <Stack.Screen
          name="fc_forget_password"
          component={FCForgetPasswordScreen}
        />
        <Stack.Screen
          name="fc_recover_password"
          component={FCRecoverPasswordScreen}
        />
        <Stack.Screen
          name="fc_recover_password_success"
          component={FCRecoverPasswordSuccessScreen}
        />
        <Stack.Screen name="fc_verify_email" component={FCVerifyEmailScreen} />
        <Stack.Screen
          name="fc_verify_email_success"
          component={FCVerifyEmailSuccessScreen}
        />
        <Stack.Screen
          name="fc_account_step_first"
          component={FCAccountStep1Screen}
        />
        <Stack.Screen
          name="fc_account_step_second"
          component={FCAccountStep2Screen}
        />
        <Stack.Screen name="f_membership" component={FMembershipScreen} />
        <Stack.Screen
          name="fc_confirm_payment"
          component={FCConfirmPaymentScreen}
        />
        <Stack.Screen
          name="fc_payment_success"
          component={FCPaymentSuccessScreen}
        />

        {/* --- client Auth --- */}
        <Stack.Screen name="c_main" component={CTutorialScreen} />
        <Stack.Screen name="c_membership" component={CMembershipScreen} />

        {/* --- freelancer Projects --- */}
        <Stack.Screen
          name="f_projects_filter"
          component={FProjectsFilterScreen}
        />
        <Stack.Screen
          name="fc_projects_detail"
          component={FCProjectsDetailScreen}
        />
        <Stack.Screen
          name="f_projects_client_detail"
          component={FProjectsClientDetailScreen}
        />
        <Stack.Screen
          name="f_projects_apply"
          component={FProjectsApplyScreen}
        />
        <Stack.Screen
          name="f_projects_client_profile"
          component={FProjectsClientProfileScreen}
        />

        {/* --- freelancer Requests --- */}
        <Stack.Screen
          name="f_requests_past_interview"
          component={FRequestsPastInterviewScreen}
        />
        <Stack.Screen
          name="f_requests_interview_unconfirmed"
          component={FRequestsInterviewUnconfirmedScreen}
        />
        <Stack.Screen
          name="f_requests_interview_accepted"
          component={FRequestsInterviewAcceptedScreen}
        />
        <Stack.Screen
          name="f_requests_interview_completed"
          component={FRequestsInterviewCompletedScreen}
        />
        <Stack.Screen
          name="f_requests_invite_unconfirmed"
          component={FRequestsInviteUnconfirmedScreen}
        />
        <Stack.Screen
          name="f_requests_invite_accepted"
          component={FRequestsInviteAcceptedScreen}
        />

        {/* --- freelancer More --- */}
        <Stack.Screen name="fc_more_profile" component={FCMoreProfileScreen} />
        <Stack.Screen
          name="fc_more_edit_profile"
          component={FCMoreEditProfileScreen}
        />
        <Stack.Screen
          name="fc_more_verify_id"
          component={FCMoreVerifyIDScreen}
        />
        <Stack.Screen
          name="f_more_my_watchlist_tab"
          component={FMoreMyWatchlistTabScreen}
        />
        <Stack.Screen
          name="f_more_job_detail"
          component={FMoreJobDetailsScreen}
        />
        <Stack.Screen name="f_more_my_stats" component={FMoreMyStatsScreen} />
        <Stack.Screen
          name="f_more_payments_tab"
          component={FMorePaymentsTabScreen}
        />
        <Stack.Screen
          name="f_more_create_invoice_select"
          component={FMoreCreateInvoiceSelectScreen}
        />
        <Stack.Screen
          name="f_more_create_invoice_send"
          component={FMoreCreateInvoiceSendScreen}
        />
        <Stack.Screen
          name="f_more_add_card"
          component={FMorePaymentsAddCardScreeen}
        />
        <Stack.Screen
          name="f_more_update_job"
          component={FMoreUpdateJobProfileScreen}
        />
        <Stack.Screen name="f_more_share" component={FMoreInviteFriendScreen} />
        <Stack.Screen
          name="f_more_notifications_tab"
          component={FMoreNotificationsTabScreen}
        />
        <Stack.Screen
          name="fc_more_notifications"
          component={FCMoreNotificationsScreen}
        />
        <Stack.Screen
          name="f_more_invite_friend"
          component={FMoreInviteFriendNextScreen}
        />
        <Stack.Screen name="f_more_settings" component={FMoreSettingsScreen} />

        {/* --- client Home --- */}
        <Stack.Screen name="c_home_jobs_tab" component={CHomeJobsTabScreen} />
        <Stack.Screen
          name="c_home_favorites"
          component={CHomeFavoritesScreen}
        />
        <Stack.Screen
          name="c_home_notifications_tab"
          component={CHomeNotificationsTabScreen}
        />
        <Stack.Screen
          name="c_home_post_job_step1"
          component={CHomePostJobStep1Screen}
        />
        <Stack.Screen
          name="c_home_post_job_step2"
          component={CHomePostJobStep2Screen}
        />
        <Stack.Screen
          name="c_home_post_job_step3"
          component={CHomePostJobStep3Screen}
        />
        <Stack.Screen
          name="c_home_post_job_step4"
          component={CHomePostJobStep4Screen}
        />
        <Stack.Screen
          name="c_home_recent_proposals"
          component={CHomeRecentProposalsScreen}
        />

        {/* --- client Find --- */}
        <Stack.Screen
          name="c_professionals_profile"
          component={CProfessionalsProfileScreen}
        />
        <Stack.Screen
          name="c_find_portfolio_details"
          component={CFindPortfolioDetailsScreen}
        />
        <Stack.Screen
          name="c_find_write_review"
          component={CFindWriteReviewScreen}
        />
        <Stack.Screen
          name="c_professionals_request_interview_step1"
          component={CProfessionalsRequestInterviewStep1Screen}
        />
        <Stack.Screen
          name="c_professionals_request_interview_step2"
          component={CProfessionalsRequestInterviewStep2Screen}
        />
        <Stack.Screen
          name="c_professionals_request_interview_step3"
          component={CProfessionalsRequestInterviewStep3Screen}
        />
        <Stack.Screen
          name="c_professionals_request_interview_step4"
          component={CProfessionalsRequestInterviewStep4Screen}
        />
        <Stack.Screen
          name="c_professionals_request_interview_step5"
          component={CProfessionalsRequestInterviewStep5Screen}
        />
        <Stack.Screen
          name="c_find_send_offer"
          component={CFindSendOfferScreen}
        />

        {/* --- client Projects --- */}
        <Stack.Screen
          name="c_projects_details_tab"
          component={CProjectsDetailsTabScreen}
        />
        <Stack.Screen
          name="c_projects_files_upload"
          component={CProjectsFilesUploadScreen}
        />

        {/* --- client Messages --- */}
        <Stack.Screen name="fc_messages_chat" component={FCMessagesChatScreen} />

        {/* --- client More --- */}
        <Stack.Screen
          name="c_more_requests_tab"
          component={CMoreRequestsTabScreen}
        />
        <Stack.Screen
          name="c_more_job_detail"
          component={CMoreJobDetailScreen}
        />
        <Stack.Screen
          name="c_more_payments_tab"
          component={CMorePaymentsTabScreen}
        />
        <Stack.Screen
          name="c_more_no_select_card"
          component={CMoreNoSelectCardScreen}
        />
        <Stack.Screen
          name="c_more_payments_add_card"
          component={CMorePaymentsAddCardScreeen}
        />
        <Stack.Screen
          name="c_more_select_card"
          component={CMoreSelectCardScreen}
        />
        <Stack.Screen
          name="c_more_payment_success"
          component={CMorePaymentSuccessScreen}
        />
        <Stack.Screen name="c_more_settings" component={CMoreSettingsScreen} />
        <Stack.Screen
          name="c_more_pay_invoice"
          component={CMorePayInoviceScreen}
        />
        <Stack.Screen
          name="c_more_pay_paystack"
          component={CMorePayPaystackScreen}
        />
        <Stack.Screen
          name="c_m_requests_past_interview"
          component={CMRequestsPastInterviewScreen}
        />
        <Stack.Screen
          name="c_m_requests_interview_unconfirmed"
          component={CMRequestsInterviewUnconfirmedScreen}
        />
        <Stack.Screen
          name="c_m_requests_interview_accepted"
          component={CMRequestsInterviewAcceptedScreen}
        />
        <Stack.Screen
          name="c_m_requests_interview_completed"
          component={CMRequestsInterviewCompletedScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
