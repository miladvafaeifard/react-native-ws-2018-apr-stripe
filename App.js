import React from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import CardInput from './components/CardInput';
import StripeClient from './StripeClient';

const testApiKey = 'sk_test_7Jifm8AU6se8vBgdWcb5un6t';
export default class App extends React.Component {
  constructor(){
    super();
    this.stripe = new StripeClient(testApiKey);
  }

  handlePayPressed = async card => {
    // Alert.alert(card.number);
    const token = await this.stripe.tokenizeCard({
      number: card.number,
      expMonth: card.mm,
      expYear: card.yy,
      cvc: card.cvc,
    });
    // Alert.alert(token.id);
    const cardTokenId = token.id;
    const customer = await this.stripe.createCustomer({
      email: 'foo-cutomer@example.com',
      source: cardTokenId
    });

    const charge = await this.stripe.chargeCustomer({
      customer: customer.id,
      amount: 1000,
      currency: 'usd'
    });

    Alert.alert(charge.id);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <CardInput onCardChanged={this.handlePayPressed}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    // justifyContent: 'scretch',
    padding: 20,
  },
});
