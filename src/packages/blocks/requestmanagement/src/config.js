Object.defineProperty(exports, "__esModule", {
  value: true
});

// Customizable Area Start
exports.validationApiContentType = "application/json";
exports.validationApiMethodType = "GET";
exports.exampleAPiEndPoint = "EXAMPLE_URL";
exports.exampleAPiMethod = "POST";
exports.exampleApiContentType = "application/json";
exports.textInputPlaceHolder = "Enter Text";
exports.labelTitleText = "TextDetector";
exports.labelBodyText = "TextDetector Body";

exports.btnExampleTitle = "CLICK ME";

exports.requestApiContentType = "application/json";
exports.getReceivedRequestApiEndpoint = "request_management/requests/received";
exports.getReceivedRequestApiMethod = "GET";

exports.getSendRequestApiEndpoint = "request_management/requests/sent";
exports.getSendRequestApiMethod = "GET";

exports.getAllReceivedRequestApiEndpoint = "request_management/requests";
exports.getAllReceivedRequestApiMethod = "GET";

exports.createSendRequestApiEndpoint = "request_management/requests";
exports.createSendRequestApiMethod = "POST";

exports.emptyGroupIdAlert = "Please select group id";
exports.emptyRejectReasonAlert = "Please enter reason";
exports.acceptedMsgText = "Request has been accepted.";
exports.rejectedMsgText = "Request has been rejected.";
exports.deletedMsgText = "Request has been deleted.";
exports.requestSentSuccessMsg = "Request has been sent."
exports.requestUpdateSuccessMsg = "Request has been updated."
exports.downloadedSuccessMsg = "File has been downloaded! File Path: ";
exports.downloadingFailedMsg = "Something went wrong!";
exports.updateRequestApiEndpointStart = "request_management/requests/";
exports.updateRequestApiEndpointEnd = "/review";
exports.updateRequestApiMethod= "PUT";

exports.deleteRequestApiEndpoint = "request_management/requests/";
exports.deleteRequestApiMethod= "DELETE";

exports.getGroupsApiEndpoint = "account_groups/groups";
exports.getGroupsApiMethod= "GET";

exports.getSentRequestApiEndpoint = "request_management/requests/sent";
exports.getSentRequestApiMethod= "GET";

exports.updateRequestTextApiEndpoint = "request_management/requests/";
exports.updateRequestTextApiMethod= "PUT";

exports.getTrackingDetailListEndpoint = "bx_block_tracking_detail/tracking_details?notary_request_id=";
exports.addTrackingDetailsEndpoint = "bx_block_tracking_detail/tracking_details";

exports.titleText = "Request Management";
exports.sendRequestBtnLabel = "Send Request";
exports.receiveRequestText = "Received Requests";
exports.nameLabelText = "Name";
exports.requestLabelText = "Request Text";
exports.rejectReasonLabelText = "Reject Reason";
exports.statusLabelText = "Status";
exports.actionLabelText = "Action";
exports.acceptBtnLabel = "Accept";
exports.rejectBtnLabel = "Reject";
exports.deleteBtnLabel = "Delete";
exports.sendRequestsText = "Sent Requests";
exports.updateBtnLabel = "Update";
exports.viewBtnLabel = "View";
exports.requestIdLabel = "Request ID";
exports.sendRequestDialogTitle = "Send Request";
exports.updateRequestDialogTitle = "Update Request";
exports.rejectRequestDialogTitle = "Request reject";
exports.cancelBtnLabel = "Cancel";
exports.sendBtnLabel = "Send";
exports.rejectReasonInputLabel = "Please enter reason";
exports.requestTextInputLabel = "Please enter request text";
exports.selectGroupPlaceholder = "Please select group";
exports.rejectTextFieldIsRequired = "Please enter reject reason";
exports.loginAlertMessage = "Please login first.";
exports.filterInputLabel = "Enter request id to filter"

exports.summary = "Summary";
exports.userNotaryRequestApiEndPoint = "bx_block_menu_ordering/notary_requests";
exports.cancelRequest = "Cancel Request";
exports.cancelCofirmMsg = "Are you sure you want to Cancel the order?";
exports.back = "Back";
exports.yesProceed = "Yes, proceed";
exports.chargeRequest = "Cancellation charges will be applied of ";
exports.cancellationApiFirstEndPoint = "bx_block_menu_ordering/notary_requests/";
exports.cancellationApiSecondEndPoint = "/cancellation_charges";
exports.cancelRequestApiEndpoint = "/cancel_end_user_notary_request";
exports.makeQuotation = "Make Quotation";
exports.makeQuote = "Submit Quote";
exports.decline = "Decline";
exports.notVerified = "Not Verified";
exports.datePlaceholder = "Choose date";
exports.chooseTime = "Choose meeting time";
exports.timeDes = "Choose start & end time";
exports.startTimePlaceholder = "Start time";
exports.endTimePlaceholder = "End time";
exports.videoCallRequired = "Video call required";
exports.videoCallReqDes = "I understand that I am requesting remote digital notarisation. I will need to have audio/video capability for the actual signing.";
exports.yourFees = "Your Fees";
exports.yourFeesDes = "Your fees price against the service";
exports.includingPlatformFees = "Including platform fees";
exports.includingPlatformFeesDes = "Tick the check box if your fees includes platform fees";
exports.addMesage= "Add message";
exports.addMessageDes = "You can leave special instructions or additional information.";
exports.submit = "Submit";
exports.endTimeErrorMsg = "Please select start and end time";
exports.feesErrorMsg = "Please select currency and enter fees";
exports.feesLimitMsg = "Please enter valid fees";
exports.currencyErrorMsg = "Please select currency";
exports.makeQuoteApiEndPoint = "bx_block_quotemanagement2/quotes";
exports.errorMsgOfVideoCallReq = "Please select video call required";
exports.sucessMsgDetail ="you can check the status from the below button";
exports.sucessMsgTitle = "Quote Submitted Successfully";
exports.noQuoteYet = "No quotes yet!"
exports.noQuoteYetDetail = "stay calm you’ll get one very soon";
exports.failMsgTitle= "Your Quote Submission Failed!";
exports.failMsgDetail= "Please try again later.";
exports.chooseYourCurrency = "Choose your Currency";
exports.proceedApiEndPoint = "bx_block_stripe_integration/pay_now";
exports.getQuteStatusListApiEndPoint= "bx_block_quotemanagement2/quotes/quote_statuses";
exports.successPaymentTitle= "Payment Successful";
exports.successPaymentDes1= "Your payment towards Order ID: ";
exports.successPaymentDes2= " has been successfully processed. You can review the details of your order below.";

exports.failPaymentTitle= "Payment Failed";
exports.failPaymentDes1= "Unfortunately, your payment attempt for Order Number: ";
exports.failPaymentDes2= " was not successful. Please attempt the payment again below.";
exports.acceptQuoteApiEndpoint = "bx_block_quotemanagement2/quotes/";
exports.acceptQuote = "/accept_quote";
exports.withdrawQuote = "/withdraw_quote"
exports.noMeetingYet= "No meetings yet!";
exports.noMeetingDes= "we’ll notify you if anything comes up.";
exports.scheduleMeeting = "Schedule a Meeting";
exports.renotaryMeeting = "Renotary Meeting";

exports.zoomPopupTitle1= "Click" ;
exports.zoomPopupTitle2= " Allow ";
exports.zoomPopupTitle3= "on the dialog shown by your browser, If you don’t see a dialog click";
exports.zoomPopupTitle4= " Launch Meeting ";
exports.zoomPopupTitle5= "below";

exports.zoomPopupDes1= "By joining a meeting, you agree to our";
exports.zoomPopupDes2= " Terms of Service";
exports.zoomPopupDes3= " and";
exports.zoomPopupDes4= " Privacy Statement";
exports.noTrackingYet= "No tracking details yet";
exports.noKycVerifiedYet = "No KYC verification request";
exports.noKycVerifiedDes = "You don’t have any kyc verification request sent by your notary";
exports.docusignNotYet = "Docusign not started yet for this request";
exports.docusignNotYetTitle = "No docusign yet!";
exports.withdrawConfirmationMsg = "Are you sure you want to cancel the quote?";
exports.docuSignStartApiEndpoint = "/bx_block_menu_ordering/docusign_status";
exports.signNow = "Sign Now";
exports.docusignStartApiEndPoint = "bx_block_menu_ordering/docusign_start";
exports.meetingApiEndPoint = "bx_block_cfzoomintegration92/zoom_meetings?";
exports.kycVerificationStatusApiEndpoint = "bx_block_knowyourcustomerkycverification2/onfidos/get_notary_request_status?notary_request_id=";
exports.unreadeMessageApiEndpoint = "bx_block_chat/unread_message_count?id=";
exports.createChatRoomApiEndPoint = 'bx_block_chat/chats';
exports.countryCodeApiEndPoint = "bx_block_menu_ordering/country_codes";
exports.getAllServicesApiEndpoint = 'bx_block_landing_page/admin_landing_pages/get_services';
exports.notrazationMethodApiEndPoint = "bx_block_menu_ordering/notary_requests/all_notarisation_method";
exports.onCreateInviteClient = "bx_block_menu_ordering/invite_request";
exports.errorOfServiceEmpty = "Choose type of notary service";
exports.errorOfNotarisationEmpty = "Choose method of notarisation";
exports.errorOfDataAndTimeEmpty = "Choose date & time";
exports.inviteClientText="Invite Client";
exports.dashboarContentType = "application/json";
exports.availabilityEndPoint = 'bx_block_menu_ordering/menu_orderings/availability';


exports.markAsCompleteApiEndpoint1 = "bx_block_menu_ordering/notary_requests/";
exports.markAsCompleteApiEndpoint2 = "/mark_as_completed";
exports.patchMethodType = "PATCH";
exports.sucessMarkAsCompleteMsg = "Mark as Completed successfully";
exports.noteForInvitesStatus = "Note: In order to preview and make payments for the quote, you need to accept the invite request first. Once accepted, you will be able to proceed with the necessary actions.";
exports.noteForRejectedStatus = "Note: This request has already been rejected. As a result, you will not be able to preview the details or make payments for the quote.";

exports.nameErrorTxt = "Please enter client’s first name & last name";
exports.emailErrorTxt = "Enter a valid email address.";
exports.mobileErrorTxt = "Please enter client’s valid mobile number";
exports.servicesErrorTxt = "Please select type of notary service";
exports.notarisationErrorTxt = "Please select method of notarisation";
exports.feesErrorTxt = "Please enter your fees";
exports.dateErrorTxt = "Please select date";
exports.timeErrorTxt = "Please select Time";
exports.timeSlotErrorTxt = "Start time must be less than end time.";
exports.clientNameTitle = "Client’s first & last name";
exports.clientNameDes = "Enter client’s first & last name";
exports.clientEmailTitle = "Client’s email address";
exports.clientEmailDes = "Enter client’s email address";
exports.clientMobileTitle = "Client’s mobile number";
exports.clientMobileDes = "Enter client’s mobile number";
exports.servicesTitle = "Type of notary service";
exports.servicesDes = "Select the options that best describes your notary service.";
exports.notarisationTitle = "Method of notarisation";
exports.notarisationDes = "Select the Method of notarisation";
exports.mobileTitle = "Your fees";
exports.mobileDes = "Your fees price against the  service";
exports.dateTitle = "Date & Time";
exports.dateDes = "Select the date and time slot for your notary service";
exports.declineRequestApiEndpoint = "bx_block_menu_ordering/notary_requests/"
exports.declineRequestAPiMethod = "PUT"
// Customizable Area End