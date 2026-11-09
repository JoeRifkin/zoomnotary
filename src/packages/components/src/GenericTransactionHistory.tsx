import moment from 'moment';
import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';

interface Props {
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
    stripeImg: any;
  }


const GenericTransactionHistory: React.FC<Props> = ({stripeImg, notary_request_id, id, transaction_number, payment_date, amount, payment_method, status }) => {


    return (
        <View style={styles.card}>
            <View style={[styles.cardHeader, styles.row]}>
                <View style={styles.orderIdContainer}>
                    <Text style={styles.orderId}>Order ID</Text>
                    <Text style={[styles.orderIdValue, styles.bold]}>{notary_request_id}</Text>
                </View>
                <View style={[styles.status, status === 'PAID' ? styles.success : styles.failed]}>
                    <Text style={[styles.statusText, status === 'PAID' ? styles.successText : styles.failedText]}>{status}</Text>
                </View>
            </View>
            <View style={styles.borderLine} />
            <View style={styles.row}>
                <View>
                    <Text style={styles.label}>Transaction Number</Text>
                    <Text style={[styles.value, styles.bold]}>{transaction_number}</Text>
                </View>
                <View>
                    <Text style={styles.label}>Amount</Text>
                    <Text style={[styles.value, styles.bold]}>£{amount}</Text>
                </View>
            </View>
            <View style={styles.row}>
                <View>
                    <Text style={styles.label}>Date & Time</Text>
                    <Text style={[styles.value, styles.bold]}>{moment(payment_date).format('MM/DD/YYYY - hh:mm A')}</Text>
                </View>
                <View>
                    <Text style={styles.label}>Payment Method</Text>
                    <View style={styles.paymentMethod}>
                        <Image style={styles.stripeImgView} source={stripeImg} />
                        <Text style={[styles.paymentText, styles.bold]}>{payment_method ? payment_method : 'Stripe'}</Text>
                    </View>
                </View>
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    card: {
        backgroundColor: '#f1f5f9',
        borderRadius: 8,
        padding: 15,
        marginBottom: 10,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    orderIdContainer: {
        flexDirection: 'column',
    },
    orderId: {
        fontSize: 12,
        color: '#64748B',
    },
    orderIdValue: {
        fontSize: 14,
        fontWeight: '500',
        lineHeight: 21,
        textAlign: 'left',
        color: '#333',
    },
    status: {
        paddingVertical: 2,
        paddingHorizontal: 8,
        borderRadius: 5,
    },
    success: {
        backgroundColor: '#d1fae6',
    },
    failed: {
        backgroundColor: '#ffe2e2',
    },
    successText: {
        color: '#069668',
    },
    failedText: {
        color: '#dc2627',
    },
    statusText: {
        fontWeight: 'bold',
    },
    label: {
        color: '#64748B',
        marginTop: 5,
        marginBottom: 5,
        fontSize: 13,
    },
    value: {
        color: '#333',
        marginBottom: 5,
    },
    bold: {
        fontSize: 14,
        fontWeight: '700',
        lineHeight: 21,
        color: '#333',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10
    },
    paymentMethod: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },

    paymentText: {
        marginLeft: 5,
    },
    borderLine: {
        borderBottomColor: '#CBD5E1',
        borderBottomWidth: 1,
        marginBottom: 20,
        // width: "90%",
        // marginLeft: 20
      },
    stripeImgView: {
        height: 20,
        width: 20
    }
})

export default GenericTransactionHistory