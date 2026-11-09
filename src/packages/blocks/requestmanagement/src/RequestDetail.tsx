import React from "react";

// Customizable Area Start
import {
  StyleSheet,
  Text,
  Image,
  View,
  FlatList,
  ScrollView,
  TouchableWithoutFeedback,
  TouchableOpacity,
  KeyboardAvoidingView,
  Dimensions,
  ActivityIndicator,
  TextInput,
  Clipboard,
  Platform,
} from "react-native";
import { imgSucessIcon, imgFailCross, warningImg, messageImg, removeImg, imgCheckWhite, imgCheckGray, imgVerified, imgZoom, imgLocation, imgInvitation, imgNotes, imgClose, emptyFolderImg, imgKycNotVerifyed, imgBackArrow, imgRequestLocation, imgRequestEye, imgRequestDownload, imgRequestCalendar, imgRequestUpArrow, imgRequestDownArrow, edit, copy } from "./assets";
import moment from "moment";
import { GenericButton } from "../../../components/src/GenericButton";
import { GenericCustomModel } from "../../../components/src/GenericCustomModel";
import { GenericTextWithHperLink } from "../../../components/src/GenericTextWithHperLink";
import Icon from 'react-native-vector-icons/FontAwesome';
import { GenericTextInput } from "../../../components/src/GenericTextInput";
import CustomButton from "../../../components/src/CustomButton";
import { GenericDocSelectionModel } from "../../../components/src/GenericDocSelectionModel";
import KnowYourCustomerKycVerification from "../../knowyourcustomerkycverification/src/KnowYourCustomerKycVerification";
import InvoiceBilling from "../../../blocks/invoicebilling/src/InvoiceBilling";

interface Recipient {
  id: number;
  created_at: string; // ISO Date String
  updated_at: string; // ISO Date String
  file_document_id: number;
  name: string;
  email: string;
  is_signatory: boolean;
  signed: boolean;
  is_notary: boolean;
  signing_url: string | null;
  envelope_id: string | null;
  access_token: string | null;
}
interface DocuSignStarted {
  message: string;
  signing_urls: string;
}

interface FileDocument {
  doc_id: number;
  doc_type: string;
  doc_size: number;
  doc_base_64: string;
  doc_name: string | null;
  doc_file_url: string;
  signatory_count: number;
  recipients: Recipient[];
}

interface Signatory {
  name: string;
  email: string;
  is_signatory: boolean | null;
  signed: boolean;
}

interface DocumentSigningStatus {
  document_id: string
  file_name: string;
  is_docusign_start: boolean;
  signatory: Signatory[];
  notary: Signatory[];
  signing_urls: string;
  document_url:string;
}

interface MenuItem {
  name: string;
  key: string;
}

interface QuoteAttributes {
  notary_requests_id: number;
  start_time: string;
  video_call_required: boolean;
  fees: string;
  end_time: string;
  platform_fee_inclusive: boolean;
  message: string;
  notary_id: number;
  created_at: string;
  updated_at: string;
  quote_statuses_id: number;
  quote_status: string;
  notary_fees: string;
  platform_fees: string;
  vat_fee: string | null
}

interface QuoteData {
  id: string;
  type: string;
  attributes: QuoteAttributes;
}

// Customizable Area End

import RequestDetailController, {
  Props,
  configJSON,
} from "./RequestDetailController";
export default class RequestDetail extends RequestDetailController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start

  renderDash = () => {
    return(
      <Text style={styles.dashStyle}>-</Text>
    )
  }

  renderSmallDash = () => {
    return(
      <Text style={styles.smallDashStyle}>-</Text>
    )
  }

  renderOverviewUI = () => {
    const { requestData } = this.state;

    return (
      <View>
        <View>
          <View style={[styles.cardInsideView, styles.justifuView]}>
            <View style={[styles.cardInsideView, styles.alignView]}>
              <View style={styles.widthFirst}>
                <Text style={styles.serviceText}>Type of notary service</Text>
                {
                  requestData?.attributes?.notary_service_name?
                <Text style={styles.providerView}>{requestData?.attributes?.notary_service_name}</Text>
                :
                this.renderDash()
              }
              </View>
            </View>
            <View style={[styles.cardInsideView, styles.alignView]}>
              <View style={[styles.noDocView]}>
                <Text style={[styles.serviceText, styles.alignText]}>Urgency level</Text>
                {
                  requestData?.attributes?.priority ? 
                  <Text style={[styles.providerView, styles.alignText]}>{requestData?.attributes?.priority}</Text>
                  : 
                  this.renderSmallDash()
                }
              </View>
            </View>
          </View>

          <View style={[styles.cardInsideView, styles.justifuView]}>
            <View style={[styles.cardInsideView, styles.alignView]}>
              <View style={styles.widthFirst}>
                <Text style={styles.serviceText}>Method of notarisation</Text>
                {
                  requestData?.attributes?.notarisation_method?.notarisation_method? 
                  <Text style={styles.providerView}>{requestData?.attributes?.notarisation_method?.notarisation_method}</Text>
                  :
                  this.renderDash()
                }
              </View>
            </View>
            <View style={[styles.cardInsideView, styles.alignView]}>
              <View style={[styles.noDocView]}>
                <Text style={[styles.serviceText, styles.alignText]}>No. of Documents</Text>
                {
                  requestData?.attributes?.notarised_document ?
                  <Text style={[styles.providerView, styles.alignText]}>{requestData?.attributes?.notarised_document}</Text>
                  :
                  this.renderDash()
                }
              </View>
            </View>
          </View>

          <View style={[styles.cardInsideView, styles.justifuView]}>
            <View style={[styles.cardInsideView, styles.alignView]}>
              <View style={styles.widthFirst}>
                <Text style={styles.serviceText}>Date & Time</Text>
                {
                  requestData?.attributes?.date ?
                  <Text style={styles.providerView}>{moment(requestData?.attributes?.date).format("DD/MM/YYYY")} | {requestData?.attributes?.timing_slot}</Text>
                  :
                  this.renderSmallDash()
                }
              </View>
            </View>
            <View style={[styles.cardInsideView, styles.alignView]}>
              <View style={[styles.noDocView]}>
                <Text style={[styles.serviceText, styles.alignText]}>Jurisdiction</Text>
                {
                  requestData?.attributes?.juridiction?.jurisdiction ?
                  <Text style={[styles.providerView, styles.alignText]}>{requestData?.attributes?.juridiction?.jurisdiction}</Text>
                  :
                  this.renderSmallDash()
                }
              </View>
            </View>
          </View>
        </View>

        <View>
          <Text style={styles.docTextView}>Document(s)</Text>
          {
            !requestData?.attributes?.file_documents.length && this.renderSmallDash()
          }

          {requestData?.attributes?.file_documents.map((item: FileDocument, index: number) => {
            return (

              <View style={styles.docView} key={index}>
                <View style={[styles.docuSignView, styles.paddBott]}>
                  <Text style={styles.signatoriesTxt}>{this.truncatedText(this.getSelectedFileName(item.doc_file_url), 30)}</Text>
                  <View style={styles.imageOfArrowAndDown}>
                    <TouchableOpacity
                      testID="OpenViewFile"
                      onPress={() => this.openFileUrl(item.doc_file_url)}>

                      <Image source={imgRequestEye} style={styles.downArrow} />
                    </TouchableOpacity>
                    <TouchableOpacity
                      testID="DownloadPDFID"
                      onPress={() => this.openFileUrlDownload(item.doc_file_url)}>
                      <Image source={imgRequestDownload} style={styles.downArrowView} />

                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.borderLine} />
                <View style={[styles.paddTo]}>
                  <View style={styles.docuSignView}>
                    <Text style={styles.signatoriesTxt}>{item.signatory_count} Signatories</Text>
                    <TouchableOpacity onPress={() => this.onUpDownArrowOfSignatory(index)} >
                      <Image source={this.getArrowImgUpDown(index)} style={styles.downArrowView} />
                    </TouchableOpacity>
                  </View>
                  {this.isSignatoryNameVisible(index) && this.getIsSignatoryObject(item).map((detail: string, indexNo: number) => (
                    <View style={styles.signatoryName} key={indexNo}>
                      <Text style={styles.signatoryNameTxt}>{`${indexNo + 1}. ${detail}`}</Text>
                    </View>
                  ))}
                </View>
              </View>
            )
          })}
        </View>

        <View>
          <Text style={[styles.docTextView, styles.marTop]}>Note</Text>
          <View style={styles.notesView}>
            <Text style={styles.notesTxt}>{requestData?.attributes?.notes}</Text>
          </View>
        </View>

        {this.isCancelRequestBtnVisible() && <View>
          <GenericButton
            testID={"btnBookNow"}
            btnProps={{ ...this.btnCancelRequestProps }}
            btnDisable={true}
            btnTextLabel={configJSON.cancelRequest}
            filledBtn={true}
          />
        </View>}
        {this.isMakeQuoteBtnVisible() && <View>
          <View>
            <View style={styles.kyctxtimg}>
              <Text style={styles.kyctxt}>KYC</Text>
              <Image style={styles.notverifiedImg} source={imgKycNotVerifyed} />
            </View>
            <Text style={styles.notVerifiedTxt}>{configJSON.notVerified}</Text>
          </View>
          {this.isMakeQuoteBtnVisible() && this.renderQuoteListUI()}
          {this.isMakeQuoteBtnShow() &&
            <View>
              <GenericButton
                testID={"btnMakeQuote"}
                btnProps={{ ...this.btnMakeQuoteProps }}
                btnDisable={true}
                btnTextLabel={configJSON.makeQuote}
                filledBtn={true}
              />
              <View style={styles.marTop}>
                <GenericTextWithHperLink
                  normalText={""}
                  hyperText={configJSON.decline}
                  redirectProps={{ ...this.btnDeclineProps }}
                  testid={"btnDecline"}
                />
              </View>
            </View>}
        </View>}
      </View>
    )
  }

  renderQuoteListUI = () => {
    return (
      <View>
        {this.state.quoteListData?.data?.map((detail: QuoteData, indexNo: number) => (
          <View style={styles.viewOfQuote} key={indexNo}>
            <View style={styles.insideQuote}>
              <View style={styles.dateAmountView}>
                <View>
                  <Text style={styles.quoteTileTxt}>Quote Date</Text>
                  <Text style={styles.quoteValueTxt}>{this.getConverteDate(detail.attributes.start_time)}</Text>
                </View>
                <View style={styles.amountView}>
                  <Text style={[styles.quoteTileTxt, styles.txtView]}>Amount</Text>
                  <Text style={[styles.quoteValueTxt, styles.txtView]}>£{detail.attributes.fees}</Text>
                </View>
              </View>
              <View style={styles.dateAmountView}>
                <View>
                  <Text style={styles.quoteTileTxt}>Start time & end time</Text>
                  <Text style={styles.quoteValueTxt}>{this.getConvertedStartEndTimeFormatForView(detail)}</Text>
                </View>
                {!this.isQuoteStatusSubmitted(detail) && <View style={styles.amountView}>
                  <Text style={[styles.quoteTileTxt, styles.txtView]}>Quote status</Text>
                  <Text style={[styles.quoteValueTxt, styles.txtView]}>{detail.attributes.quote_status}</Text>
                </View>}
              </View>
            </View>

            {this.isQuoteStatusSubmitted(detail) && <TouchableOpacity onPress={() => this.onCanelButton(detail.id)} style={styles.cancelBtnView}>
              <Text style={styles.cancelBtnTxt}>Cancel</Text>
            </TouchableOpacity>}
          </View>
        ))}
        {this.renderWithdrawQuoteModel()}
      </View>
    )
  }

  renderWithdrawQuoteModel = () => {
    return (
      <GenericCustomModel
        visible={this.state.isWithdrawQuote}
        height={'auto'}
        width={337}>
        <Text style={styles.confirmationWithdrawMsgView}>{configJSON.withdrawConfirmationMsg}</Text>
        <View style={styles.btnView}>
          <View style={styles.btnViewWid}>
            <TouchableOpacity
              testID={"btnYes"}
              style={[styles.blankBtn]}
              {...this.withdrawQuoteYesProps}>
              <Text style={[styles.loginBtnText, styles.blankBtnText]}>Yes</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.btnViewWidofYes}>
            <TouchableOpacity
              testID={"btnNo"}
              style={[styles.viewOfBtn, styles.filledBtn]}
              {...this.withdrawQuoteNo}>
              <Text style={[styles.loginBtnText, styles.filledBtnText]}>No</Text>
            </TouchableOpacity>
          </View>

        </View>
      </GenericCustomModel>
    )
  }

  renderQuotesUI = () => {
    return (
      <View>
        {this.showorderQuoteView() ?
          <View >
            <FlatList
              data={this.state.quoteListData?.data}
              renderItem={({ item, index }) => (
                <View style={styles.quoteView}>
                  <View style={styles.boxView}>
                    <View style={styles.insideBoxView} >
                      <Text style={styles.quoteNoView} >Quote #{index + 1}</Text>
                      <Text style={styles.quoteTimeView}>{this.getConverteDate(item.attributes.start_time)} | {this.getConverteTime(item.attributes.start_time)}</Text>
                    </View>
                    <View>
                      <Text style={styles.quoteFeesView} >£{item.attributes.fees}</Text>
                    </View>
                  </View>
                  <View>
                    {(this.checkCancelForInviteAccept() || this.checkForNormalReq()) && <TouchableOpacity testID={"btnPreview"}
                      style={[styles.loginBtn]} onPress={() => this.onClickPreviewBtn(item, index + 1)}>
                      <Text style={styles.previewBtnText}>{'Preview'}</Text>
                    </TouchableOpacity>}
                  </View> 
                </View>
              )}
              extraData={this.state}
              keyExtractor={(item: any) => item.id}
              horizontal={false}
            />
            <View>
              {this.showNoteForQuoteTabInvite() && <Text style={styles.providerView}>{configJSON.noteForInvitesStatus}</Text>}
              {this.showNoteForQuoteTabInviteRejected() && <Text style={styles.providerView}>{configJSON.noteForRejectedStatus}</Text>}
            </View>
          </View>
          :
          <View>
            <View style={[styles.emptyFolderView]}>
              <Image style={styles.emptyFolderImg} source={emptyFolderImg} />
              <Text style={styles.emptyMsg}>{configJSON.noQuoteYet}</Text>
              <Text style={styles.emptyMsgDetail}>{configJSON.noQuoteYetDetail}</Text>
            </View>
          </View>
        }
      </View>
    )
  }

  renderMeetingUI = () => {
    return (
      <View>
        {this.isMeetingDataAvailable() ?
          <View>
            <View style={[styles.meetingView, styles[this.getOpacityStyle()]]}>
              <View style={styles.viewOfRow}>
                <Image style={styles.imgOfMeetingView} source={imgNotes} />
                <Text style={styles.reminderMeetingtxt}>{configJSON.renotaryMeeting}</Text>
              </View>
              <View style={[styles.viewOfRow, styles.marTop16]}>
                <Image style={styles.imgOfMeetingView} source={imgInvitation} />
                <Text style={styles.zoomcallTxt}>
                  {moment(this.state.meetingLinkData?.zoom_meetings?.start_time).format("DD/MM/YYYY | HH:mm")} -
                  {moment(this.state.meetingLinkData?.zoom_meetings?.end_time).format("HH:mm")}
                </Text>
              </View>
              <View style={[styles.viewOfRow, styles.marTop16]}>
                <Image style={styles.imgOfMeetingView} source={imgLocation} />
                <Text style={styles.zoomcallTxt}>Zoom Call</Text>
              </View>

              <View>
                <View style={styles.borderLineInMeeting} />

                <View style={styles.checkBoxContainerView}>
                  <TouchableOpacity {...this.btnNotifyMinsProps} style={styles.checkboxContainer} testID={"IDNotifyMins"}>
                    <View style={[styles.checkbox, this.notifyMinsProps.isChecked && styles.checked]}>
                      {this.notifyMinsProps.isChecked && <Icon name="check" size={13} color="#fff" />}
                    </View>
                  </TouchableOpacity>
                  <Text testID={"btnNofifyMinsID"} style={styles.rememberMe} {...this.btnNotifyMinsProps} >
                    {'Notify 15 mins before meeting'}
                  </Text>
                </View>
              </View>

              {this.getUserType() ? <View>
                <GenericButton
                  testID={"btnJoinMeeting"}
                  btnProps={{ ...this.btnJoinMeetingProps }}
                  btnDisable={true}
                  btnTextLabel={'Join'}
                  filledBtn={true}
                />
              </View> :
                <View style={styles.btnView}>
                  <View style={styles.btnViewWid}>
                    <TouchableOpacity
                      testID={"btnReschedule"}
                      style={[styles.blankBtn]}
                      {...this.onRescheduleClick}>
                      <Text style={[styles.loginBtnText, styles.blankBtnText]}>{'Reschedule'}</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.btnViewWidofYes}>
                    <TouchableOpacity
                      testID={"btnJoin"}
                      style={[styles.viewOfBtn, styles.filledBtn]}
                      {...this.btnJoinMeetingProps}>
                      <Text style={[styles.loginBtnText, styles.filledBtnText]}>{'Join'}</Text>
                    </TouchableOpacity>
                  </View>

                </View>
              }
            </View>
          </View>
          :
          <View>
            <View style={[styles.emptyFolderView]}>
              <Image style={styles.emptyFolderImg} source={emptyFolderImg} />
              <Text style={styles.emptyMsg}>{configJSON.noMeetingYet}</Text>
              <Text style={styles.emptyMsgDetail}>{configJSON.noMeetingDes}</Text>
            </View>
          </View>
        }
        {!this.getUserType() && <View style={styles.schedultBtnView}>
          <GenericButton
            testID={"btnScheduleMeeting"}
            btnProps={{ ...this.btnScheduleMeetingProps }}
            btnDisable={true}
            btnTextLabel={configJSON.scheduleMeeting}
            filledBtn={true}
          />
        </View>}
      </View>
    )
  }

  toggleExpand = (index: any) => {
    this.setState((prevState) => ({
      expandedItem: prevState.expandedItem === index ? null : index,
    }));
  };

  rendertTrackingItem = ({ item, index }: any) => (

    <View style={{}}>
      <TouchableOpacity testID="btntoggle" onPress={() => this.toggleExpand(index)}>
        <View style={[styles.itemContainer, this.state.expandedItem === index ? { marginVertical: 0 } : { marginVertical: 10 }]}>
          <View style={{ marginLeft: 15, marginVertical: 10, flex: 1, }}>
            <Text style={styles.trackingtext}>{item.attributes?.tracking_number}</Text>
            <Text style={styles.addedbytext}>Added by,</Text>
            <Text style={styles.trackingtext}>{item.attributes?.added_by}</Text>
            <Text style={styles.trackingdatetext}>{moment(item.attributes?.added_date).format('DD/MM/YYYY')}</Text>
          </View>
          <View style={{ justifyContent: 'center', alignItems: 'flex-end', marginRight: 10 }}>
            {this.state.expandedItem === index ?
              <Image style={styles.imagesideArrowAndDown} source={imgRequestUpArrow} /> :
              <Image style={styles.imagesideArrowAndDown} source={imgRequestDownArrow} />}
          </View>
        </View>
      </TouchableOpacity>
      {this.state.expandedItem === index && (
        <View style={styles.itemContainerdetail}>
          <View style={{ marginLeft: 15, marginVertical: 10, flex: 1, marginRight: 15, }}>
            <View>
              <View style={{ backgroundColor: '#CBD5E1', height: 1, flex: 1, marginBottom: 12 }}></View>
              <Text style={styles.addedbytext}>Shipment Provider Name</Text>
              <Text style={styles.trackingtext}>{item.attributes?.shipment_provider_name}</Text>
            </View>
            <View>
              <View style={{ backgroundColor: '#CBD5E1', height: 1, flex: 1, marginBottom: 10, marginTop: 10 }}></View>
              <View style={{ flexDirection: 'row', }}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.addedbytext}>Tracking Number</Text>
                  <Text style={styles.trackingtext}>{item.attributes?.tracking_number}</Text>
                </View>
                <TouchableOpacity
                  testID={"btncopy"} style={styles.copybutton}
                  onPress={() => Clipboard.setString(item.attributes?.tracking_number)}>
                  <Image style={styles.copyicon} source={copy} resizeMode="contain" />
                </TouchableOpacity>
              </View>
            </View>
            <View>
              <View style={{ backgroundColor: '#CBD5E1', height: 1, flex: 1, marginBottom: 10, marginTop: 10 }}></View>
              <Text style={styles.addedbytext}>Additional Note</Text>
              <Text style={styles.trackingtext}>{item.attributes?.additional_notes}</Text>
            </View>

            {this.state.emailid === item.attributes?.added_by_email ? <View style={{ flex: 1, marginTop: 5, marginBottom: 5 }}>
              <TouchableOpacity
                testID={"btnEdit"} style={styles.button}
                onPress={() => this.trackingdetailsedit(item)}>
                <Image style={styles.icon} source={edit} />
                <Text style={styles.buttonText}>Edit</Text>
              </TouchableOpacity>
            </View> : null}
          </View>
        </View>
      )}
    </View>
  );

  renderTrackingDetailUI = () => {
    return (
      <View>
        {this.isTrackingDetailAvailable() ?
          <View>
            <FlatList
              style={{ marginBottom: 30 }}
              testID="trackingflatlist"
              data={this.state.TrackingDataData?.data}
              renderItem={this.rendertTrackingItem}
              keyExtractor={(index) => index.toString()}
            />
          </View>
          :
          <View>
            <View style={[styles.emptyFolderView]}>
              <Image style={styles.emptyFolderImg} source={emptyFolderImg} />
              <Text style={styles.emptyMsgDetail}>{configJSON.noTrackingYet}</Text>
            </View>
          </View>
        }
        {this.renderAddtrackingDetailsModel()}
      </View>

    )
  }

  renderAddtrackingDetailsModel = () => {
    return (
      <GenericCustomModel
        visible={this.state.isAddtrackingDetailsModel}
        onClose={() => this.closePreviewQuoteModel()}
        height={'auto'}
        width={337}>
        <View style={styles.headerView}>
          <Text style={styles.timeTypeView}>
            Add Tracking details
          </Text>
          <TouchableOpacity {...this.cancelPreviewModel}>
            <Image source={imgClose} style={styles.closeIconView} />
          </TouchableOpacity>
        </View>
        <KeyboardAvoidingView>
          <ScrollView>
            <View style={styles.borderLineInQuoteModel} />
            <View>

              <GenericTextInput
                labelName={"Shipment Provider Name"}
                isAstrick={true}
                isValidateField={this.state.isValidateFieldName}
                placeholder={"Shipment Provider Name"}
                value={this.state.providername}
                nameError={"Please enter Shipment Provider Name"}
                txtInputNamePrpos={{ ...this.txtInputProviderNamePrpos }}
                testID={"txtprovidername"}
                maxCharLength={30} />

              <GenericTextInput
                labelName={"Tracking Number"}
                isValidateField={this.state.isValidateFieldNumber}
                nameError={"Please enter Tracking Number"}
                value={this.state.trackingnumber}
                txtInputNamePrpos={{ ...this.txtInputTrackinNumberPrpos }}
                isAstrick={true}
                placeholder={"Tracking Number"}
                testID={"txttrackingnumber"}
                maxCharLength={30} />

              <Text style={styles.AdditionalnoteText}> Additional Note (Optional)</Text>
              <TextInput
                style={{
                  height: 100,
                  backgroundColor: "#F1F5F9",
                  borderColor: "#767676",
                  borderRadius: 8,
                  flexDirection: "row",
                  fontSize: 14,
                  textAlign: "left",
                  marginBottom: 5,
                  marginTop: 8,
                  includeFontPadding: true,
                  paddingLeft: 10,
                  paddingBottom: 10,
                  fontWeight: '400',
                  lineHeight: 22,
                  fontStyle: 'normal',
                }}
                multiline={true}
                numberOfLines={50}
                placeholder="Additional Note"
                textAlignVertical="top"
                value={this.state.additionalnote}
                onChangeText={this.onChangeAdditionalNotes}
                blurOnSubmit={true}
              />
              <View >
                <TouchableOpacity testID={"btnPayNow"}
                  style={[styles.loginBtn]} {...this.btnAddTrackingDetailsProps}>
                  <Text style={styles.previewBtnText}>{'+ Add'}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </GenericCustomModel>
    )
  }

  renderKYCVerificationUI = () => {
    return (
      <View>
        <KnowYourCustomerKycVerification
          navigation={this.props.navigation}
          requestId={this.state.requestData?.id}
        />
      </View>
    )
  }

  renderDocuSignUI = () => {
    return (
      <View>
        {this.isDocuSignDetailAvailable() ? (
          <View>{this.renderDocuSignDetails()}</View>
        ) : (
          this.renderEmptyDocuSignView()
        )}
      </View>
    );
  };

  renderDocuSignDetails = () => {
    const { docuSignDetail } = this.state;

    return docuSignDetail && docuSignDetail.map((detail: DocumentSigningStatus, indexNo: number) => (
      <View style={styles.docViewTab} key={indexNo}>
        {this.renderDocumentHeader(detail)}
        {this.renderDocuSignHeader(detail, indexNo)}
        {this.renderDocumentSignatoryNotary(detail, indexNo)}
        {this.renderPendingPreviewMessage(detail)}
        {this.renderActionButtons(detail)}
      </View>
    ));
  };

  renderDocuSignHeader = (detail: DocumentSigningStatus, indexNo: number) => {
    return (
      <View style={[styles.docuSignView, styles.marTop5]}>
        <Text style={styles.signatoriesAndNotaryTxt}>
          {`${detail.signatory.length} Signatories | ${detail.notary.length} Notary`}
        </Text>
        <TouchableOpacity onPress={() => this.onUpDownArrowOfDocuSign(indexNo)}>
          <Image
            source={this.getArrowImgInDocuUpDown(indexNo)}
            style={[styles.downArrowView, styles.margRight5]}
          />
        </TouchableOpacity>
      </View>
    );
  };

  renderDocumentHeader = (detail: DocumentSigningStatus) => (
    <View style={styles.docuSignView}>
      <Text style={styles.documentInDocTxt}>{this.truncatFileName(detail.file_name)}</Text>
       <TouchableOpacity onPress={()=> this.openFileUrlDownload(detail?.document_url)}
        style={styles.imageOfArrowAndDown}>
        <Image source={imgRequestDownload} style={styles.downloadImgView} />
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>this.openFileUrl(detail?.document_url)}>
        <Image source={imgRequestEye} style={styles.eyeImgView} />
        </TouchableOpacity>
      
    </View>
  );

  renderDocumentSignatoryNotary = (detail: DocumentSigningStatus, indexNo: number) => {
    if (!this.isDocSignNameForNotartyAnsSigVisible(indexNo)) return null;

    return (
      <View>
        {this.renderSignatories(detail.signatory)}
        {this.renderNotaries(detail.notary)}
      </View>
    );
  };

  renderSignatories = (signatories: Signatory[]) => (
    <View style={styles.margTop10}>
      <Text style={styles.SignatoriesTxt}>Signatories</Text>
      {signatories.map((signatory, index) => (
        <View key={index}>
          {this.renderPersonCard(signatory)}
          {index < signatories.length - 1 && <View style={styles.borderLine} />}
        </View>
      ))}
    </View>
  );

  renderNotaries = (notaries: Signatory[]) => (
    <View style={styles.margTop10}>
      <Text style={styles.SignatoriesTxt}>Notary</Text>
      {notaries.map((notary, index) => (
        <View key={index}>{this.renderPersonCard(notary)}</View>
      ))}
    </View>
  );

  renderPersonCard = (person: Signatory) => (
    <View style={styles.card}>
      <Image source={imgVerified} style={styles.profileImage} />
      <View style={styles.userInfo}>
        <Text style={styles.name}>{person.name}</Text>
        <Text style={styles.email}>{person.email}</Text>
      </View>
      <View
        style={[
          styles.statusBadge,
          styles[this.getBackColorForSigned(person.signed)]
        ]}
      >
        <Text
          style={[
            styles.statusTxt,
            styles[this.getTxtColorForSigned(person.signed)],
          ]}
        >
          {this.getSignedStatus(person.signed)}
        </Text>
      </View>
    </View>
  );

  renderPendingPreviewMessage = (detail: DocumentSigningStatus) => {
    if (this.isAllSigned(detail)) return null;

    return (
      <View>
        <View style={[styles.borderLine, styles.margTop10]} />
        <Text style={styles.suggestinTxt}>
          Please preview and sign the documents sent by notary
        </Text>
      </View>
    );
  };

  renderActionButtons = (detail: DocumentSigningStatus) => (
    <View>
      {this.shouldShowEndUserButton(detail) && this.renderEndUserButton(detail)}
      {this.shouldShowNotaryUserButton(detail) &&
        detail.is_docusign_start &&
        this.renderNotaryUserButton(detail)}
      {this.renderStartButton(detail)}
    </View>
  );

  renderEndUserButton = (detail: DocumentSigningStatus) => (
    <TouchableOpacity onPress={() => this.redirectPageToDocuSign({ message: "", docMessSign: 'sign', signing_urls: detail.signing_urls, access_token: '', envelope_id: '' }, detail.document_id)} style={[styles.startBtnView, styles.btnBackGColor]}>
      <Text style={[styles.startBtnTxt, styles.btntxtColor]}>
        {configJSON.signNow}
      </Text>
    </TouchableOpacity>
  );

  renderNotaryUserButton = (detail: DocumentSigningStatus) => (
    <TouchableOpacity onPress={() => this.redirectPageToDocuSign({ message: "", docMessSign: 'sign', signing_urls: detail.signing_urls, access_token: '', envelope_id: '' }, detail.document_id)}
      disabled={this.isNotaryButtonDisabled(detail)}
      style={[
        styles.startBtnView,
        styles[this.getBtnColorAccordingToEnable(detail)],
      ]}
    >
      <Text style={[styles.startBtnTxt, styles.btntxtColor]}>
        {configJSON.signNow}
      </Text>
    </TouchableOpacity>
  );

  renderStartButton = (detail: DocumentSigningStatus) => {
    if (this.getUserType() || detail.is_docusign_start) return null;

    return (
      <TouchableOpacity onPress={() => this.startDocusignFromNotary(detail)} style={[styles.startBtnView, styles.btnBackGColor]}>
        <Text style={[styles.startBtnTxt, styles.btntxtColor]}>Start</Text>
      </TouchableOpacity>
    );
  };

  renderEmptyDocuSignView = () => (
    <View style={styles.emptyFolderView}>
      <Image style={styles.verifiedImg} source={imgVerified} />
      <Text style={styles.emptyMsg}>{configJSON.docusignNotYetTitle}</Text>
      <Text style={styles.emptyMsgDetail}>{configJSON.docusignNotYet}</Text>
    </View>
  );


  renderZoomMeetingPopup = () => {
    return (
      <GenericCustomModel
        visible={this.state.isZoomMeetingModel}
        onClose={() => this.closeZoomMeetingPopup()}
        height={'auto'}
        width={337}>
        <View style={styles.xoomImgView}>
          <Image style={styles.zoomImgView} source={imgZoom} />
        </View>
        <View>
          <Text style={styles.firstPopupTxt}>{configJSON.zoomPopupTitle1}
            <Text style={styles.secPopupTxt}>{configJSON.zoomPopupTitle2}</Text>
            {configJSON.zoomPopupTitle3}
            <Text style={styles.secPopupTxt}>{configJSON.zoomPopupTitle4}</Text>
            {configJSON.zoomPopupTitle5}
          </Text>
        </View>

        <View style={styles.popupSecondtxt}>
          <Text style={styles.firstPopupTxt}>{configJSON.zoomPopupDes1}
            <Text style={styles.privacyPopupTxt}>{configJSON.zoomPopupDes2}</Text>
            {configJSON.zoomPopupDes3}
            <Text style={styles.privacyPopupTxt}>{configJSON.zoomPopupDes4}</Text>
          </Text>
        </View>

        <View style={styles.btnView}>
          <View style={styles.btnViewWid}>
            <TouchableOpacity
              testID={"btnCancel"}
              style={[styles.blankBtn]}
              {...this.cancelMeetingPopup}>
              <Text style={[styles.loginBtnText, styles.blankBtnText]}>{'Cancel'}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.btnViewWidofYes}>
            <TouchableOpacity
              testID={"btnLaunchMeeting"}
              style={[styles.viewOfBtn, styles.filledBtn]}
              onPress={this.launchMeeting}>
              <Text style={[styles.loginBtnText, styles.filledBtnText]}>{'Launch meeting'}</Text>
            </TouchableOpacity>
          </View>

        </View>
      </GenericCustomModel>
    )
  }

  renderPayNowQuoteModel = () => {
    return (
      <GenericCustomModel
        visible={this.state.isPreviewQuoteModel}
        onClose={() => this.closePreviewQuoteModel()}
        height={'auto'}
        width={337}>
        <View style={styles.headerView}>
          <Text style={styles.timeTypeView}>
            Quote #{this.state.quoteNumber}
          </Text>
          <TouchableOpacity
            testID="onCloseTestID"
            onPress={() => this.closeAddTrackingModel()}>
            <Image source={imgClose} style={styles.closeIconView} />
          </TouchableOpacity>
        </View>
        <View style={styles.borderLineInQuoteModel} />
        <View>
          <View>
            <Text style={styles.timeDateView} >Date</Text>
            <Text style={styles.valueDateTimeView}>{this.getConverteDate(this.state.previewQuoteDetail?.attributes?.start_time)}</Text>
          </View>
          <View>
            <Text style={styles.timeDateView} >Time</Text>
            <Text style={styles.valueDateTimeView}>{this.getConverteTime(this.state.previewQuoteDetail?.attributes.start_time)} - {this.getConverteTime(this.state.previewQuoteDetail?.attributes.end_time)}</Text>
          </View>
          <View>
            <Text style={styles.timeDateView} >Fees</Text>
            <View style={styles.feesView}>
              <Text style={styles.feesTxt}>Notary Fees :</Text>
              <Text style={styles.feesTxt}>£{this.state.previewQuoteDetail?.attributes.notary_fees}</Text>
            </View>
            <View style={styles.feesView}>
              <Text style={styles.feesTxt}>Platform  Fees :</Text>
              <Text style={styles.feesTxt}>+ £{this.state.previewQuoteDetail?.attributes.platform_fees}</Text>
            </View>
            <View style={styles.feesView}>
              <Text style={styles.feesTxt}>VAT  Fees :</Text>
              <Text style={styles.feesTxt}>+ £{this.getVatFees()}</Text>
            </View>
          </View> 
          <View style={[styles.borderLineInQuoteModel, styles.marTop5]} />
          <View style={styles.feesView}>
            <Text style={styles.totlaFeesTxt}>Total :</Text>
            <Text style={styles.totlaFeesTxt}>£{this.getTotalFees()}</Text>
          </View>
          <View>
            <Text style={styles.timeDateView} >Message</Text>
            <Text style={styles.messageDetailView} >{this.state.previewQuoteDetail?.attributes.message}</Text>
          </View>
          <View >
            <TouchableOpacity testID={"btnPayNow"}
              style={[styles.loginBtn]} {...this.btnPayNowProps}>
              <Text style={styles.previewBtnText}>{'Pay Now'}</Text>
            </TouchableOpacity>
            <View style={[styles.marTop, styles.donotHave]}>
              <TouchableOpacity
                testID="CancelID"
                onPress={() => this.closeAddTrackingModel()}>

                <View style={styles.bottomBorder}>
                  <Text style={[styles.signUpView, styles.textDonthaveAndSignup]} testID={'btnCancel'} >{configJSON.cancelBtnLabel}</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </GenericCustomModel>
    )
  }

  renderRequestCancelModel = () => {
    return (
      <GenericCustomModel
        visible={this.state.isCancelRequestModelOpen}
        onClose={() => this.closeCancelRequestModel()}
        height={'auto'}
        width={337}>
        <Text style={styles.confirmationMsgView}>{configJSON.cancelCofirmMsg}</Text>
        {(this.showCancellactionChargeAmount()) &&
          <Text style={styles.requestChargeMsgView}>{configJSON.chargeRequest}
            <Text style={styles.chargeAmountView}>{this.formatCancellactionNumber(this.state.CancellationCharge?.cancellation_charges?.toString() || "0")}£</Text>
          </Text>}
        <View style={styles.btnView}>
          <View style={styles.btnViewWid}>
            <TouchableOpacity
              testID={"btnNoToProceed"}
              style={[styles.blankBtn]}
              {...this.noToChanges}>
              <Text style={[styles.loginBtnText, styles.blankBtnText]}>{configJSON.back}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.btnViewWidofYes}>
            <TouchableOpacity
              testID={"btnYesProceed"}
              style={[styles.viewOfBtn, styles.filledBtn]}
              {...this.yesProceedToChanges}>
              <Text style={[styles.loginBtnText, styles.filledBtnText]}>{configJSON.yesProceed}</Text>
            </TouchableOpacity>
          </View>

        </View>
      </GenericCustomModel>
    )
  }

  renderHeaderSection = () => {
    return (
      <>
        <View style={[styles.mainHeaderView, { paddingBottom: 30 }]}>
          <TouchableOpacity style={styles.backImg} testID={"btnbackArrow"} { ...this.btnGoBackToDashboard }>
            <Image style={styles.imgArrowBack} source={imgBackArrow} />
          </TouchableOpacity>

          <Text style={styles.titleView}>{configJSON.summary}</Text>

          {this.isMessageIconVisiable() && <View style={[styles.rightView, styles.directionIcon]}>
            <TouchableOpacity {...this.onClickMessageIconProps}>
              {this.showMessageIconWithRed() ?
                <View style={styles.containerImg}>
                  <Image source={messageImg} style={styles.messageIcon} />
                  <Text style={styles.countStyle}>{this.state.messageCount?.count}</Text>
                </View>
                : <Image style={styles.imgArrowBack} source={messageImg} />
              }
            </TouchableOpacity>
          </View> }
        </View>
      </>
    );
  };

  renderRequestStatus = () => {
    const { requestData } = this.state;
    return (
      <View style={styles.idstatusView}>
        <Text style={styles.idView}>#{requestData?.id}</Text>
        <View style={[styles.statusView, styles[this.renderStatusView()]]}>
          <Text style={[styles.statusText, styles[this.renderStatusText()]]}>
            {requestData?.attributes.invite_request ?  requestData?.attributes.invited_request_status :requestData?.attributes.status}
          </Text>
        </View>
      </View>
    );
  };

  renderRequestDetails = () => {
    const { requestData } = this.state;
    return (
      <>
      {
        requestData?.attributes?.date &&
        <View style={styles.dataTimeView}>
          <Image source={imgRequestCalendar} style={styles.calendarView} />
          <Text style={styles.timeDataText}>
            {moment(requestData?.attributes?.date).format("DD MMM YYYY | hh:mm A")}
          </Text>
        </View>
      }
      {
        requestData?.attributes?.juridiction?.jurisdiction &&
        <View style={styles.dataTimeView}>
          <Image source={imgRequestLocation} style={styles.calendarView} />
          <Text style={styles.timeDataText}>
            {requestData?.attributes?.juridiction?.jurisdiction}
          </Text>
        </View>
      }
      </>
    );
  };

  renderTabs = () => {
    return (
      <FlatList
        showsHorizontalScrollIndicator={false}
        ref={this.flatListRef}
        data={this.getFilterTabs()}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => this.onClickOfTab(item.key, index)}
            style={[
              styles.tabsView,
              styles[this.tabViewStyle(item.key)]
            ]}
          >
            <Text style={[
              styles.tabsText,
              styles[this.tabViewStyleTxt(item.key)]]}>
              {item.name}
            </Text>
            {this.showQuoteNumber(item.key) && (
              <View style={styles.quoteCountView}>
                <Text style={styles.quoteCountTxt}>
                  {this.state.quoteListData?.data.length}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        )}
        extraData={this.state}
        keyExtractor={(item) => item.key}
        horizontal={true}
      />
    );
  };

  renderContentSection = () => {
    const { selectedTab } = this.state;
    switch (selectedTab) {
      case 'overview':
        return this.renderOverviewUI();
      case 'quotes':
        return this.renderQuotesUI();
      case 'meeting':
        return this.renderMeetingUI();
      case 'tracking':
        return this.renderTrackingDetailUI();
      case 'kyc':
        return this.renderKYCVerificationUI();
      case 'signing':
        return this.renderDocuSignUI();
      default:
        return null;
    }
  };

  renderMarkCompleteButton = () => {
    return this.isShowMarkCompletedForNotary() && (
      <View style={styles.completeBtnView}>
        <TouchableOpacity
          {...this.getMarkCompleteModelOpen}
          style={[
            styles.markAsCompleteView,
            this.isMarkAsCompleteBtnClickable() ?
              styles.enableMarkCompletedView : styles.disableMarkCompletedView
          ]}
        >
          <Text
            style={[
              styles.markAsCompleteTxt,
              this.isMarkAsCompleteBtnClickable() ?
                styles.enableMarkCompletedTxt : styles.disableMarkCompletedTxt
            ]}
          >
            {'Mark as Completed'}
          </Text>
          <Image
            style={styles.checkImgView}
            source={this.isMarkAsCompleteBtnClickable() ?
              imgCheckWhite : imgCheckGray}
          />
        </TouchableOpacity>
      </View>
    );
  };

  renderFooterModals = () => {
    return (
      <>
        {this.renderZoomMeetingPopup()}
        {this.renderRequestCancelModel()}
        {this.renderPayNowQuoteModel()}
      </>
    );
  };

  renderFaileCancelRequestModel = () => {
    return (
      <GenericCustomModel
        visible={this.state.isCancellactionErrorPopup}
        height={'auto'}
        width={337}>
        <View style={styles.failedTxtView}>
          <Image style={styles.removeImgView} source={removeImg} />
          <Text style={styles.firstHeadingForCancelFaile} >{'Request Cancellation Failed'}</Text>
          <Text style={styles.secHeadingForCancelFaile}>{this.state.cancellationError?.errors}</Text>
        </View>
        <View style={styles.btnView}>
          <View style={styles.btnOkForCancel}>
            <TouchableOpacity
              testID={"btnOkId"}
              style={[styles.viewOfBtn, styles.filledBtn]}
              {...this.onClickOfOk}>
              <Text style={[styles.loginBtnText, styles.filledBtnText]}>{'Ok'}</Text>
            </TouchableOpacity>
          </View>

        </View>
      </GenericCustomModel>
    )
  }

  renderMarkCompleteModal = () => {
    return <GenericCustomModel visible={this.state.isMarkCompleteModelOpen} width={Dimensions.get('screen').width - 50}>
      <View style={styles.center}>
        <Image source={warningImg} style={styles.warningImg} />
      </View>
      <Text style={styles.modalTitle}>Are you sure you want to mark this request as completed?</Text>
      <View>
        <CustomButton
          testID='markCompleteId'
          title={'Yes, Mark Completed'}
          onPress={this.callMarkAsComplete}
        />
        <CustomButton
          testID='onCancelID'
          title={'Cancel'}
          onPress={this.closeMarkCompletedModel}
          outlined={true}
        />
      </View>
    </GenericCustomModel>
  }

  // Customizable Area End

  render() {
    // Customizable Area Start
    return (
      <KeyboardAvoidingView
        behavior={this.isPlatformiOS() ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          keyboardShouldPersistTaps="always"
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          <TouchableWithoutFeedback
            onPress={() => {
              this.hideKeyboard();
            }}
          >
            <View>
              {this.renderHeaderSection()}
              <View style={styles.fieldView}>
                {this.renderRequestStatus()}
                {this.renderRequestDetails()}

                {this.state.requestID &&
                  this.state.requestData?.attributes.status.toLowerCase() === 'in progress' &&
                  <InvoiceBilling id="InvoiceBilling" navigation={this.props} notaryRequestId={this.state.requestID} />
                }

              </View>
              {this.renderMarkCompleteButton()}
              {this.renderTabs()}
              <View style={styles.fieldView}>
                {this.renderContentSection()}
              </View>
              {this.renderFooterModals()}

              {this.state.isLoader && <View style={styles.loaderStyles}>
                <ActivityIndicator size="large" color="#012275" />
              </View>}
              {this.renderFaileCancelRequestModel()}
              {this.renderMarkCompleteModal()}

              <GenericDocSelectionModel
                visible={this.state.markAsSucessfully || this.state.markCompletedApiError !== ''}
                height={42}
                hasBackdrop={false}
                coverScreen={false}
                width={'auto'}
                buttonModelView={styles.sucessModel}
                isModelView={false}>
                <View style={[styles.sucessChangesView]}>
                  <Image style={styles.sucessImg} source={this.state.markAsSucessfully ? imgSucessIcon : imgFailCross} />
                  <Text style={styles.changesSavedTxt}>{this.state.markAsSucessfully ? configJSON.sucessMarkAsCompleteMsg : this.state.markCompletedApiError}</Text>
                </View>
              </GenericDocSelectionModel>
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
        {this.state.selectedTab === "tracking" && <View style={styles.addMoreTrackingTab}>
          <GenericButton
            testID={"btnAddMore"}
            btnProps={{ ...this.btnAddMoreTrackingProps }}
            btnDisable={true}
            btnTextLabel={'Add More  +'}
            filledBtn={true}
          />
        </View>
        }
      </KeyboardAvoidingView>
    );
    // Customizable Area End
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffffff",
  },
  contentContainer: {
    paddingBottom: 30,
  },

  fieldView: {
    padding: 24
  },
  idstatusView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  idView: {
    fontSize: 22,
    fontWeight: 'bold',
    lineHeight: 26.4,
    color: '#012275'
  },
  statusView: {
    height: 22,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusText: {
    fontWeight: '700',
    lineHeight: 12,
    fontSize: 12,
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 6,
    paddingBottom: 6,
    borderRadius: 6,
    textTransform: 'uppercase',
  },

  draftStatusView: {
    backgroundColor: "#CCD3E3"
  },
  draftStatusTxt: {
    color: "#334155"
  },
  completedStatusView: {
    backgroundColor: "#D1FAE5"
  },
  completedStatusTxt: {
    color: "#059669"
  },
  rejectedStatusTxt: {
    color: "#FF0000"
  },
  invitedStatusTxt: {
    color: "#6200EA"
  },
  acceptedStatusTxt: {
    color: "#059669"
  },
  rejectedStatusView: {
    backgroundColor: "#FF000038"
  },
  invitedStatusView: {
    backgroundColor: "#F0E5FF"
  },
  acceptedStatusView: {
    backgroundColor: "#D1FAE5"
  },

  inprogressStatusView: {
    backgroundColor: "#FEF3C7"
  },
  inprogressStatusTxt: {
    color: "#D97706"
  },

  pendingStatusView: {
    backgroundColor: "#F0E5FF"
  },
  pendingStatusTxt: {
    color: "#6200EA"
  },

  cancelledStatusView: {
    backgroundColor: "#FEE2E2"
  },
  cancelledStatusTxt: {
    color: "#DC2626"
  },
  calendarView: {
    height: 16,
    width: 16
  },
  dataTimeView: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 8,
  },
  timeDataText: {
    marginLeft: 5,
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 22,
    color: '#64748B'
  },
  tabsView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 45,
    width: 148,
    marginBottom: 10
  },
  selectedTabsText: {
    color: "#012275",
    fontWeight: 'bold',
  },
  unselectedTabsText: {
    fontWeight: '500',
    color: "#64748B",
  },
  tabsText: {
    lineHeight: 24,
    fontSize: 16
  },
  tabBorder: {
    borderBottomWidth: 3,
    borderBottomColor: "#012275",
  },
  unselectedTabBorder: {
    borderBottomColor: '#F1F5F9',
    borderBottomWidth: 3
  },
  cardInsideView: {
    flexDirection: 'row'
  },
  dashStyle: {
    marginLeft:50,
    color: '#334155',
    lineHeight: 22.4,
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 30
  },
  smallDashStyle :{
    marginLeft:30,
    color: '#334155',
    lineHeight: 22.4,
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 30
  },
  justifuView: {
    justifyContent: 'space-between',
  },
  alignView: {
    alignItems: 'center',
  },
  serviceText: {
    color: '#64748B',
    lineHeight: 18,
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 7,
  },
  providerView: {
    color: '#334155',
    lineHeight: 22.4,
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 30
  },
  alignText: {
    textAlign: 'right'
  },
  noDocView: {
    justifyContent: 'flex-end'
  },
  widthFirst: {
    width: 200,
  },
  docTextView: {
    color: '#64748B',
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 18,
    marginBottom: 5
  },
  docView: {
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
    paddingLeft: 8,
    paddingRight: 8,
    paddingBottom: 12,
    paddingTop: 12,
    height: 'auto',
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginBottom: 10
  },
  signatoriesTxt: {
    color: '#64748B',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 18
  },
  downArrowView: {
    height: 24,
    width: 24
  },
  docuSignView: {
    justifyContent: 'space-between',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
  },
  paddTo: {
    paddingTop: 12
  },
  paddBott: {
    paddingBottom: 12
  },
  imageOfArrowAndDown: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  downArrow: {
    height: 32,
    width: 32,
    marginRight: 10
  },
  borderLine: {
    borderBottomColor: '#E2E8F0',
    borderBottomWidth: 1,
  },
  notesView: {
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
    paddingLeft: 8,
    paddingRight: 8,
    paddingBottom: 12,
    paddingTop: 12
  },
  notesTxt: {
    color: '#475569',
    fontSize: 14,
    lineHeight: 22.4,
    fontWeight: '400'
  },
  marTop: {
    marginTop: 10
  },
  signatoryNameTxt: {
    color: '#334155',
    lineHeight: 19.6,
    fontSize: 14,
    fontWeight: '500'
  },
  signatoryName: {
    paddingLeft: 10,
    paddingTop: 10
  },
  btnView: {
    flexDirection: 'row',
    marginTop: 25,
    alignItems: 'center',
    justifyContent: 'center'
  },
  btnViewWid: {
    width: '46%'
  },
  btnViewWidofYes: {
    width: '46%',
    marginLeft: 15
  },
  viewOfBtn: {
    height: 44,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
    borderRadius: 8,
  },
  filledBtn: {
    backgroundColor: '#012275',
  },
  blankBtn: {
    borderWidth: 2,
    borderColor: "#012275",
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
    borderRadius: 8,
    backgroundColor: '#F8FAFC'
  },
  filledBtnText: {
    color: '#fff',
  },
  blankBtnText: {
    color: '#012275',
  },
  loginBtnText: {
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: 24
  },
  confirmationMsgView: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 26.6,
    textAlign: 'left'
  },
  requestChargeMsgView: {
    color: '#334155',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 19.6,
    textAlign: 'left'
  },
  chargeAmountView: {
    color: '#DC2626'
  },
  kyctxtimg: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20
  },
  kyctxt: {
    color: '#1E293B',
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 19.36
  },
  notverifiedImg: {
    height: 24,
    width: 24
  },
  notVerifiedTxt: {
    color: '#475569',
    lineHeight: 22,
    fontWeight: '400',
    fontSize: 14
  },
  emptyFolderView: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30
  },
  emptyFolderImg: {
    height: 120,
    width: 120,
  },
  verifiedImg: {
    height: 77,
    width: 77,
  },
  emptyMsg: {
    color: '#1E293B',
    fontSize: 14,
    lineHeight: 28,
    fontWeight: '600'
  },
  emptyMsgDetail: {
    color: '#64748B',
    fontSize: 14,
    lineHeight: 28,
    fontWeight: '400'
  },
  emptyMsgDetailForKYC: {
    textAlign: 'center'
  },
  quoteCountView: {
    backgroundColor: '#012275',
    height: 18,
    width: 18,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quoteCountTxt: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '500',
    lineHeight: 11,
  },
  quoteView: {
    borderRadius: 8,
    borderColor: '#CCD3E3',
    borderWidth: 1,
    padding: 12,
    marginBottom: 20
  },
  boxView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  insideBoxView: {
    flexDirection: 'column'
  },
  quoteNoView: {
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 19.36,
    color: '#000000',
    marginBottom: 5
  },
  quoteTimeView: {
    color: '#475569',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 18,
  },
  quoteFeesView: {
    color: '#DC2626',
    fontWeight: '700',
    fontSize: 18,
    lineHeight: 26,
  },
  previewBtnText: {
    color: '#fff',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: 24
  },
  loginBtn: {
    width: '100%',
    height: 38,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    borderRadius: 8,
    backgroundColor: '#012275',
  },
  closeIconView: {
    height: 24,
    width: 24
  },
  timeTypeView: {
    color: '#1E293B',
    fontWeight: '600',
    lineHeight: 19.36,
    fontSize: 16
  },
  headerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10
  },
  borderLineInQuoteModel: {
    borderBottomColor: '#CBD5E1',
    borderBottomWidth: 1
  },
  timeDateView: {
    color: '#334155',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 18,
    marginTop: 20
  },
  valueDateTimeView: {
    color: '#334155',
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 19.36,
    marginBottom: 10
  },
  feesView: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  feesTxt: {
    color: '#64748B',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 19.06
  },
  totlaFeesTxt: {
    color: '#334155',
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 22.04
  },
  marTop5: {
    marginTop: 5
  },
  messageDetailView: {
    color: '#334155',
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 25.26
  }, signUpView: {
    color: '#012275',
    fontWeight: 'bold',
  },
  bottomBorder: {
    borderBottomWidth: 2,
    borderBottomColor: '#012275'
  },
  textDonthaveAndSignup: {
    textAlign: 'center',
    fontSize: 14,
    fontStyle: 'normal',
    lineHeight: 22,
  },
  donotHave: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  meetingView: {
    backgroundColor: '#F1F5F9',
    borderRadius: 8,
    padding: 16
  },
  viewOfRow: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  imgOfMeetingView: {
    height: 18,
    width: 18
  },
  meetingViewOpacity: {
    opacity: 1
  },
  lessmeetingViewOpacity: {
    opacity: 0.7
  },
  reminderMeetingtxt: {
    color: '#012275',
    fontWeight: '600',
    fontSize: 18,
    lineHeight: 26,
    marginLeft: 5
  },
  zoomcallTxt: {
    color: '#475569',
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 16.94,
    marginLeft: 5,
  },
  marTop16: {
    marginTop: 16
  },
  borderLineInMeeting: {
    borderBottomColor: '#CBD5E1',
    borderBottomWidth: 1,
    marginTop: 10,
  },

  checkBoxContainerView: {
    flexDirection: "row",
    marginBottom: 7,
    marginTop: 10,
    marginLeft: -7,
    zIndex: -1,
    color: '#011342'
  },
  rememberMe: {
    color: "#475569",
    fontWeight: "500",
    alignSelf: "center",
    fontSize: 14,
    lineHeight: 16.95,
    fontStyle: 'normal'
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 15,
    height: 15,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#012275',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 7,
    marginLeft: 8
  },
  checked: {
    backgroundColor: '#012275',
    borderColor: '#012275',
  },
  canccelEventView: {
    borderBottomColor: '#012275',
    borderBottomWidth: 1,
    marginTop: 10,
    width: 89
  },
  cancelEventtxt: {
    color: '#012275',
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 16.94
  },
  schedultBtnView: {
    marginTop: (Dimensions.get('screen').height / 4) - 40,
  },
  addMoreTrackingTab: {
    padding: 25,
    position: 'absolute',
    bottom: 10,
    width: '100%'
  },
  zoomImgView: {
    width: 133,
    height: 62,
  },
  xoomImgView: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  firstPopupTxt: {
    color: "#1E293B",
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center'
  },
  secPopupTxt: {
    color: "#1E293B",
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 19.36
  },
  privacyPopupTxt: {
    color: "#012275",
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 21
  },
  popupSecondtxt: {
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
  },
  viewOfQuote: {
    backgroundColor: '#012275',
    padding: 16,
    borderRadius: 8,
    marginTop: 20
  },
  insideQuote: {
    flexDirection: 'column',
  },
  dateAmountView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
    alignItems: 'center'
  },
  quoteTileTxt: {
    color: '#94A3B8',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 18,
    marginBottom: 5
  },
  quoteValueTxt: {
    color: '#FFFFFF',
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 21,
  },
  amountView: {
    justifyContent: 'flex-end',
    flexDirection: 'column',
  },
  txtView: {
    textAlign: 'right'
  },
  cancelBtnView: {
    backgroundColor: '#F8FAFC',
    borderRadius: 6,
    height: 34,
    justifyContent: 'center',
    alignItems: 'center'
  },
  cancelBtnTxt: {
    color: '#012275',
    fontWeight: '700',
    fontSize: 14,
    lineHeight: 22
  },
  confirmationWithdrawMsgView: {
    color: '#1E293B',
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 28.8,
    textAlign: 'left'
  },
  markAsCompleteView: {
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    flexDirection: 'row'
  },
  markAsCompleteTxt: {
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 22
  },
  disableMarkCompletedTxt: {
    color: '#64748B',
  },
  disableMarkCompletedView: {
    backgroundColor: '#D1FAE5',
  },
  enableMarkCompletedTxt: {
    color: '#FFFFFF',
  },
  enableMarkCompletedView: {
    backgroundColor: '#059669',
  },
  completeBtnView: {
    paddingBottom: 24,
    paddingLeft: 24,
    paddingRight: 24
  },
  checkImgView: {
    height: 24,
    width: 24,
    marginLeft: 5
  },
  documentInDocTxt: {
    color: '#000000',
    fontWeight: '600',
    fontSize: 18,
    lineHeight: 21.78
  },
  eyeImgView: {
    height: 32,
    width: 32,

  },
  downloadImgView: {
    height: 24,
    width: 24,
    marginRight: 10
  },
  docViewTab: {
    backgroundColor: '#F1F5F9',
    borderRadius: 8,
    padding: 12,
    height: 'auto',
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginBottom: 10
  },
  signatoriesAndNotaryTxt: {
    color: '#334155',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 18
  },
  startBtnView: {
    height: 44,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15
  },
  startBtnTxt: {
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 22
  },
  btntxtColor: {
    color: '#FFFFFF',
  },
  btnBackGColor: {
    backgroundColor: '#012275',
  },
  btnDisableColor: {
    backgroundColor: '#CCD3E3'
  },
  btnDisableTxtColor: {
    color: '#FFFFFF'
  },
  margRight5: {
    marginRight: 5
  },
  suggestinTxt: {
    color: '#334155',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 22,
    marginTop: 15
  },
  margTop10: {
    marginTop: 10
  },
  SignatoriesTxt: {
    color: '#475569',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 18
  },

  card: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  profileImage: {
    width: 32,
    height: 32,
    borderRadius: 20,
    marginRight: 5,
  },
  userInfo: {
    flex: 1,
  },
  name: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000000',
    lineHeight: 17
  },
  email: {
    fontSize: 12,
    fontWeight: '400',
    color: '#475569',
    lineHeight: 18
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 6,
  },
  backGColorStatus: {
    backgroundColor: '#FEF3C7'
  },
  backGColorForSigned: {
    backgroundColor: '#D1FAE5'
  },
  statusTxt: {
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 12
  },
  statusTxtColor: {
    color: '#D97706'
  },
  signedTxtColor: {
    color: '#059669'
  },
  role: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#666',
    marginLeft: 10,
    marginTop: 10,
  },
  loaderStyles: {
    justifyContent: 'center',
    flex: 1,
    ...StyleSheet.absoluteFillObject,
    zIndex: 9999,
    opacity: 1,
    alignItems: 'center'
  },
  itemContainer: {
    backgroundColor: '#F8FAFC',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1
  },
  addedbytext: {
    fontSize: 12,
    fontWeight: '400',
    color: '#64748B',
  },
  trackingtext: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1E293B',
    marginVertical: 7
  },
  trackingdatetext: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1E293B',
  },
  imagesideArrowAndDown: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 25,
    width: 25
  },
  itemContainerdetail: {
    backgroundColor: '#F8FAFC',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1
  },
  AdditionalnoteText:
  {
    marginTop: 10,
    color: '#334155',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: 18,
    alignItems: 'flex-start',
    flexDirection: 'row'
  },
  button: {
    flexDirection: 'row', // Align icon and text in a row
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    backgroundColor: '#012275',
  },
  icon: {
    marginRight: 10,
    height: 20,
    width: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 24
  },
  copybutton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  copyicon: {
    height: 20,
    width: 20,
  },
  removeImgView: {
    height: 72,
    width: 72
  },
  firstHeadingForCancelFaile: {
    color: '#DC2626',
    fontWeight: '700',
    fontSize: 24,
    lineHeight: 33.6,
    textAlign: 'center',
    marginTop: 10
  },
  secHeadingForCancelFaile: {
    color: '#334155',
    fontWeight: '400',
    fontSize: 18,
    lineHeight: 22,
    marginBottom: 10,
    marginTop: 10
  },
  failedTxtView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnOkForCancel: {
    width: '100%',
  },
  webView: {
    height: 500,
    width: 500
  },
  imgArrowBack: {
    height: 24,
    width: 24
  },
  backImg: {
    position: 'absolute',
    left: 16,
    top: Platform.OS === 'ios' ? 60 : 30
  },
  titleView: {
    color: '#FFF',
    textAlign: 'center',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: 24
  },
  rightView: {
    position: 'absolute',
    right: 20,
    top: Platform.OS === 'ios' ? 60 : 30
  },
  directionIcon: {
    flexDirection: 'row'
  },
  mainHeaderView: {
    backgroundColor: '#012275',
    height: 'auto',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 60 : 30
  },
  containerImg: {
    position: 'relative', 
  },
  messageIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  redDot: {
    position: 'absolute',
    width: 8, 
    height: 8,
    resizeMode: 'contain',
    top: 0, 
    right: 0, 
  },
  center:{
    justifyContent:'center',
    alignItems:'center',
  },
  warningImg:{
    height:48,
    width:48,
    resizeMode:'contain',
    marginBottom:10
  },
  discntBtn: {
    color: '#012275',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 19.36,
    textAlign: 'center',
    borderBottomColor:"#012275",
    borderBottomWidth:1,
    alignSelf:'center',
    marginTop:15
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 28.8,
    textAlign: 'center',
    color:'#334155',
    paddingHorizontal:20
  },
  sucessModel: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(44, 44, 46, 0.4)',
    paddingBottom: 60,
  },
  sucessChangesView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 15,
    paddingRight: 15,
  },
  sucessImg: {
    height: 21,
    width: 21,
    marginRight: 8
  },
  changesSavedTxt: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24
  },
  countStyle: {
    backgroundColor: '#FF0000',
    color: '#fff',
    justifyContent:'center',
    alignItems: 'center',
    textAlign: 'center',
    position: 'absolute',
    width: 18, 
    height: 18,
    borderRadius: 9,
    top: -5, 
    right: -5, 
    fontSize: 9,
    paddingVertical:2
  }
});
// Customizable Area End
