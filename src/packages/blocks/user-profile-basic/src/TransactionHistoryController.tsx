import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
    getName,
} from "../../../framework/src/Messages/MessageEnum";
import { NativeSyntheticEvent, NativeScrollEvent, Platform } from 'react-native';
import { getStorageData } from "../../../framework/src/Utilities";
import moment from "moment";
interface Payment {
    id: number;
    account_id: number;
    request_type: string;
    payment_date: string;
    payment_method: string | null;
    transaction_number: string;
    notary_request_id: number;
    notary_id: number | null;
    status: 'PAID' | 'FAILED' | string;
    amount: string;
    created_at: string;
    updated_at: string;
}
interface FilterOption {
    title: string;
    key: string;
}

interface Day {
    dateString: string; // 'YYYY-MM-DD'
    day: number;        // Day of the month
    month: number;      // Month of the year (1-12)
    year: number;       // Year
}
// Customizable Area End

export const configJSON = require("./config");

export interface Props {
    navigation: any;
    id: string;
    // Customizable Area Start
    // Customizable Area End
}

interface S {
    txtInputValue: string;
    txtSavedValue: string;
    enableField: boolean;
    // Customizable Area Start
    token: string;
    transactions: Payment[];
    loading: boolean;
    searchQuery: string;
    error: string;
    filterOfType: string;
    pageNumber: number;
    isScrollAtBottom: boolean;
    transactionLength: number;
    isFilterPageOpen: boolean;
    selectedDayFilter: FilterOption | null;
    selectedPaymentStatus: FilterOption | null;
    selectedDateRange: string | undefined;
    selectedDateType: string;
    isCalendarForDateSelect: boolean;
    selectedDate: string | null;
    startDate: string | null;
    endDate: string | null;
    isLoader: boolean;
    request_start_date: string;
    request_end_date: string
    // Customizable Area End
}

interface SS {
    id: any;
    // Customizable Area Start
    // Customizable Area End
}

export default class TransactionHistoryController extends BlockComponent<Props, S, SS> {
    // Customizable Area Start
    getTransactionsApiCallId: string = '';
    daysFilterType = [
        { title: 'Today', key: 'today' },
        { title: 'Last 7 Days', key: '7days' },
        { title: 'Last 30 Days', key: '30days' },
        { title: 'Last 90 Days', key: '90days' }
    ]
    paymentStatusType = [
        { title: 'Successful', key: 'PAID' },
        { title: 'Failed', key: 'FAILED' }
    ]
    userType: number = 1
    // Customizable Area End

    constructor(props: Props) {
        super(props);
        this.receive = this.receive.bind(this);

        this.subScribedMessages = [
            getName(MessageEnum.AccoutLoginSuccess),
            // Customizable Area Start
            getName(MessageEnum.RestAPIResponceMessage),
            getName(MessageEnum.SessionSaveMessage),
            getName(MessageEnum.SessionResponseMessage),
            // Customizable Area End
        ];

        this.state = {
            txtInputValue: "",
            txtSavedValue: "A",
            enableField: false,
            // Customizable Area Start
            token: '',
            transactions: [],
            loading: true,
            searchQuery: '',
            error: '',
            filterOfType: 'ALL',
            pageNumber: 1,
            isScrollAtBottom: false,
            transactionLength: 0,
            isFilterPageOpen: false,
            selectedDayFilter: null,
            selectedPaymentStatus: { title: 'All', key: "ALL" },
            selectedDateRange: '',
            selectedDateType: '',
            isCalendarForDateSelect: false,
            selectedDate: null,
            startDate: null,
            endDate: null,
            isLoader: false,
            request_start_date: '',
            request_end_date: ''
            // Customizable Area End
        };
        runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

        // Customizable Area Start
        // Customizable Area End
    }

    // Customizable Area Start

    async componentDidMount() {
        this.getToken();
        setTimeout(() => {
            this.getTransactions(`?filter=${this.state.selectedPaymentStatus}&order_id=&request_date_start=&request_date_end=`);
        }, 300);
    }

    getToken = () => {
        const msg: Message = new Message(
            getName(MessageEnum.SessionRequestMessage)
        );
        this.send(msg);
    };

    async receive(from: string, message: Message) {
        runEngine.debugLog("Message Recived", message);
        if (getName(MessageEnum.SessionResponseMessage) === message.id) {
            this.handleTokenAndUserType(message);
        }
        const apiRequestCallId = message.getData(
            getName(MessageEnum.RestAPIResponceDataMessage)
        );

        let responseJson = message.getData(
            getName(MessageEnum.RestAPIResponceSuccessMessage)
        );
        this.setState({ loading: false })
        if (responseJson && !responseJson.errors) {
            if (apiRequestCallId === this.getTransactionsApiCallId) {
                this.setState({
                    isLoader: false,
                    isScrollAtBottom: false,
                    transactions: this.state.searchQuery === '' ? [
                        ...this.state.transactions,
                        ...(responseJson.transaction_history ?? [])
                    ] : responseJson.transaction_history,
                    error: responseJson.error ?? '',
                    transactionLength: responseJson?.transaction_history?.length || 0
                });
            }
        }
    }

    handleTokenAndUserType = async (message: Message) => {
        let token = message.getData(getName(MessageEnum.SessionResponseToken));
        const userDetail = await getStorageData('userProfileData');
        const userData = JSON.parse(userDetail)
        this.userType = userDetail && userData ? userData.role_id : '';
        this.setState({ token: token, isLoader: true });
    }

    handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
        const isAtBottom = layoutMeasurement.height + contentOffset.y >= contentSize.height - 20;
        if (isAtBottom && !this.state.isScrollAtBottom) {
            this.setState({ isScrollAtBottom: true });
            this.onScrollToBottom();
        }
    };

    onScrollToBottom = () => {
        if (this.state.transactionLength === 10) {
            this.setState({ pageNumber: this.state.pageNumber + 1, isLoader: true }, () => {
                const urlParams = `?order_id=${this.state.searchQuery}&filter=${this.state.selectedPaymentStatus?.key}&request_date_start=${this.state.request_start_date}&request_date_end=${this.state.request_end_date}`;
                this.getTransactions(urlParams);
            })
        }
    };

    closeFilterPage = {
        onPress: () => {
            this.setState({ isFilterPageOpen: false })
        }
    }

    onSecImageClick = {
        onPress: () => {
            this.setState({ isFilterPageOpen: true })
        }
    }

    onGoBack = {
        onPress: () => {
            this.goBack()
        }
    }

    goBack = () => {
        this.props.navigation.goBack();
    }

    onChange = (text: string) => {
        this.setState({ searchQuery: text }, () => {
            if (this.state.searchQuery === '') {
                this.setState({ isLoader: true, pageNumber: 1, transactions: [], transactionLength: 0 }, () => {
                    this.getTransactions(`?filter=${this.state.selectedPaymentStatus?.key}&order_id=&request_date_start=${this.state.request_start_date}&request_date_end=${this.state.request_end_date}`);
                });
            }
        });
    }

    onSearch = () => {
        this.setState({ isLoader: true, loading: true, pageNumber: 1, transactions: [], transactionLength: 0 }, () => {
            const urlParams = `?order_id=${this.state.searchQuery}&request_date_start=${this.state.request_start_date}&request_date_end=${this.state.request_end_date}`;
            this.getTransactions(urlParams);
        });
    }

    getTransactions = (urlParams: string) => {
        const header = {
            "Content-Type": configJSON.contentTypeApplicationJson,
            token: this.state.token,
        };
        const requestMessage = new Message(
            getName(MessageEnum.RestAPIRequestMessage)
        );
        this.getTransactionsApiCallId = requestMessage.messageId;
        requestMessage.addData(
            getName(MessageEnum.RestAPIResponceEndPointMessage),
            `${configJSON.transaction_history_endpoint}${urlParams}&per_page=10&page=${this.state.pageNumber}`
        );
        requestMessage.addData(
            getName(MessageEnum.RestAPIRequestHeaderMessage),
            JSON.stringify(header)
        );
        requestMessage.addData(
            getName(MessageEnum.RestAPIRequestMethodMessage),
            configJSON.getMethod
        );
        runEngine.sendMessage(requestMessage.id, requestMessage);
    };

    getSelectDaysFilter = (key: FilterOption) => {
        this.setState({ selectedDateRange: '', selectedDayFilter: key, startDate: null, endDate: null, selectedDate: null }, () => {
            this.handleSelection(key.key)
        })
    }

    handleSelection = (key: string) => {
        const today = moment().format('YYYY-MM-DD');
        let calculatedStartDate = null;

        switch (key) {
            case 'today':
                calculatedStartDate = today;
                this.setState({ request_start_date: calculatedStartDate, request_end_date: today })
                break;

            case '7days':
                calculatedStartDate = moment().subtract(7, 'days').format('YYYY-MM-DD');
                this.setState({ request_start_date: calculatedStartDate, request_end_date: today })
                break;

            case '30days':
                calculatedStartDate = moment().subtract(30, 'days').format('YYYY-MM-DD');
                this.setState({ request_start_date: calculatedStartDate, request_end_date: today })
                break;

            case '90days':
                calculatedStartDate = moment().subtract(90, 'days').format('YYYY-MM-DD');
                this.setState({ request_start_date: calculatedStartDate, request_end_date: today })
                break;

            default:
                this.setState({ request_start_date: '', request_end_date: '' })
        }
    };

    getSelectPaymentStatus = (key: FilterOption) => {
        this.setState({ selectedPaymentStatus: key })
    }

    renderStyleOfDataTImeFieldAccordingToOS = () => {
        if (Platform.OS === 'ios') {
            return 'paddTopBott'
        } else {
            return 'padd'
        }
    }

    btnOpenCalendarProps = {
        onPress: () => {
            this.getCalendarModalOpen()
        }
    }

    getCalendarModalOpen = () => {
        this.setState({ isCalendarForDateSelect: true })
    }

    closeCalendarModel = () => {
        this.setState({
            isCalendarForDateSelect: false,
            selectedDate: null,
            startDate: null,
            endDate: null,
            selectedDateType: ''
        })
    }

    closeCalendar = {
        onPress: () => {
            this.closeCalendarModel()
        }
    }

    onResetFilter = {
        onPress: () => {
            this.setState({
                selectedDayFilter: null,
                selectedPaymentStatus: { title: 'All', key: 'ALL' },
                selectedDateRange: '',
                selectedDateType: '',
                startDate: null,
                endDate: null,
                selectedDate: null,
                isFilterPageOpen: false,
                isLoader: true,
                transactions: [],
                transactionLength: 0,
                request_end_date: '',
                request_start_date: '',
                pageNumber: 1
            }, () => {
                this.getTransactions(`?filter=${this.state.selectedPaymentStatus?.key}&order_id=&request_date_start=&request_date_end=`);
            })
        }
    }

    onApplyFilter = {
        onPress: () => {
            if (this.getButtonEnabled()) {
                this.setState({
                    isFilterPageOpen: false,
                    isLoader: true,
                    transactions: [],
                    transactionLength: 0,
                    pageNumber: 1
                }, () => {
                    this.getTransactions(`?filter=${this.state.selectedPaymentStatus?.key}&order_id=${this.state.searchQuery}&request_date_start=${this.state.request_start_date}&request_date_end=${this.state.request_end_date}`);
                })
            }
        }
    }

    getButtonEnabled = () => {
        const { selectedPaymentStatus, selectedDayFilter, selectedDateRange } = this.state;
        if ((this.state.selectedPaymentStatus?.title !== 'All' && selectedPaymentStatus !== null) || selectedDayFilter !== null || selectedDateRange !== '') {
            return true
        } else {
            return false
        }
    }

    formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    updateFormattedDateRange = (date: string) => {
        if (date) {
            const formattedStartDate = this.formatDate(date);
            return formattedStartDate;
        }
    };

    onDateSelectDone = {
        onPress: () => {
            const { startDate, endDate, selectedDate, selectedDateType } = this.state;
            if (selectedDateType === 'single' && selectedDate !== null) {
                this.setState({
                    selectedDateRange: this.updateFormattedDateRange(selectedDate),
                    isCalendarForDateSelect: false,
                    request_end_date: selectedDate,
                    request_start_date: selectedDate,
                    selectedDayFilter: null
                })
            }
            if (selectedDateType === 'range' && startDate && endDate !== null) {
                this.setState({
                    selectedDateRange: `${this.updateFormattedDateRange(startDate)} - ${this.updateFormattedDateRange(endDate)}`,
                    isCalendarForDateSelect: false,
                    request_start_date: startDate,
                    request_end_date: endDate,
                    selectedDayFilter: null
                })
            }
        }
    }

    getDoneButtonEnabled = () => {
        const { startDate, endDate, selectedDate, selectedDateType } = this.state;
        if (selectedDateType === 'single' && selectedDate !== null) {
            return true
        } else if (selectedDateType === 'range' && startDate && endDate !== null) {
            return true
        } else {
            return false
        }
    }

    onSelectSingleDate = {
        onPress: () => {
            this.setState({ selectedDateType: 'single' })
        }
    }

    onSelectRangeDate = {
        onPress: () => {
            this.setState({ selectedDateType: 'range' })
        }
    }

    handleDayPress = (day: Day) => {
        const { selectedDateType, startDate, endDate } = this.state;
        const selectedDate = day.dateString;

        if (selectedDateType === 'single') {
            this.setState({ selectedDate });
        } else if (selectedDateType === 'range') {
            if (!startDate) {
                this.setState({ startDate: selectedDate, endDate: null });
            } else if (!endDate) {
                if (selectedDate < startDate) {
                    this.setState({ startDate: selectedDate, endDate: null });
                } else {
                    this.setState({ endDate: selectedDate });
                }
            } else {
                this.setState({ startDate: selectedDate, endDate: null });
            }
        }
    };

    getMarkedDates = () => {
        const { selectedDate, startDate, endDate, selectedDateType } = this.state;
        const markedDates: { [key: string]: any } = {};

        if (selectedDateType === 'single' && selectedDate) {
            markedDates[selectedDate] = {
                selected: true,
                selectedColor: '#012275',
                selectedTextColor: '#fff',
            };
        } else if (selectedDateType === 'range' && startDate && endDate) {
            let end = new Date(endDate);
            let current = new Date(startDate);

            while (current <= end) {
                const dateString = current.toISOString().split('T')[0];
                markedDates[dateString] = {
                    selected: true,
                    selectedColor: '#012275',
                    selectedTextColor: '#fff',
                };
                current.setDate(current.getDate() + 1);
            }
        }
        return markedDates;
    };

    isFilterApplyed = () => {
        if (this.state.selectedPaymentStatus !== null || (this.state.selectedDateType && this.state.selectedDateRange) || this.state.selectedDayFilter !== null) {
            return true
        } else {
            return false
        }
    }

    isPaymentStatusSelectForFilter = () => {
        if (this.state.selectedPaymentStatus !== null && this.state.selectedPaymentStatus?.title !== 'All') {
            return true
        } else {
            return false
        }
    }

    isDayTypeSelectForFilter = () => {
        if (this.state.selectedDayFilter !== null) {
            return true
        } else {
            return false
        }
    }

    isDateRangeSelectForFilter = () => {
        if (this.state.selectedDateType && this.state.selectedDateRange) {
            return true
        } else {
            return false
        }
    }

    isShowingHistoryList = () => {
        if (this.state.transactions && this.state.transactions.length > 0) {
            return true
        } else {
            return false
        }
    }

    getTitleOfHeader = () => {
        if (this.userType === 1) {
            return configJSON.payments
        } else {
            return configJSON.transactionHistoryTitle
        }
    }


    // Customizable Area End
}