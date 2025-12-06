import { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function MainScreen({ navigation }) {

    // set the default states
    const [baseCurrency, setBaseCurrency] = useState("CAD");
    const [destinationCurrency, setDestinationCurrency] = useState("");
    const [result, setResult] = useState(null);
    const [amount, setAmount] = useState("1");
    const [loading, setLoading] = useState(false);

    // validate currency code format
    const validateCurrencyCode = (code) => {
        const regex = /^[A-Z]{3}$/; // exactly 3 uppercase letters
        return regex.test(code);
    }

    // validate amount (must be positive)
    const validateAmount = (value) => {
        const number = parseFloat(value); // convert string to number (float)
        return !isNaN(number) && number > 0; // check if number is valid and positive
    }

    // convert currency function
    const convertCurrency = async () => {

        // validate currency input
        if (!validateCurrencyCode(baseCurrency)) {
            Alert.alert("Invalid Input", "Base currency must be a 3 letter code (e.g., USD, CAD).");
            return;
        }

        // validate destination amount input
        if (!validateCurrencyCode(destinationCurrency)) {
            Alert.alert("Invalid Input", "Destination currency must be a 3 letter code (e.g., USD, CAD).");
        }

        // validate amount input
        if (!validateAmount(amount)) {
            Alert.alert("Invalid Input", "Amount must be a positive number.");
            return;
        }

        setLoading(true);
        setResult(null); 

        try {

            // api call
            const apiKey = "fca_live_Au4AfANuiZfOWK2wm2F2V4Q7ANadOeH775JlW5M1"; // replace with actual key
            const response = await fetch(); // TODO: get API url

            // check if request was successful
            if(!response.ok){
                if (response.status == 401){
                    throw new Error("Invalid API key.");
                }else if (response.status == 422){
                    throw new Error("Invalid currency code.");
                }else{
                    throw new Error("Failed to get exchange rates.");
                }
            }

            // parse the JSON response
            const data = await response.json();

            // validate the response
            if (!data.data || !data.data[destinationCurrency]){
                throw new Error(`Exchange rate for ${destinationCurrency} not found.`);
            }

            const exchangeRate = data.data[destinationCurrency];
            const convertedAmount = parseFloat(amount) * exchangeRate;
            setResult({
                convertedAmount: convertedAmount.toFixed(2),
                exchangeRate: exchangeRate.toFixed(4)
            })
        } catch (error){
            Alert.alert("Error", error.message);
        }finally{
            setLoading(false);
        }
    }

    return(
        <View>
            <Text style={StyleSheet.title}>Currency Converter</Text>

            {/* Base Currency Input */}
            <View style={StyleSheet.inputContainer}>
                <Text style={styles.label}>Base Currency</Text>
                <TextInput style={styles.input} value={baseCurrency} onChangeText={setBaseCurrency}
                    placeholder="CAD" autoCapitalize="characters" maxLength={3}/>
            </View>

            {/* Destination Currency Input */}
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Destination Currency</Text>
                <TextInput style={styles.input} value={destinationCurrency} onChangeText={setDestinationCurrency}
                    placeholder="USD" autoCapitalize="characters" maxLength={3}/>
            </View>

            {/* Amount Input */}
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Amount</Text>
                <TextInput style={styles.input} value={amount} onChangeText={setAmount}
                    placeholder="1" keyboardType="numeric"/>
            </View>

            {/* Convert Button */}
            <TouchableOpacity style={[styles.button, loading && styles.buttonDisabled]}
                onPress={convertCurrency} disabled={loading}>
                    {loading ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text style={styles.buttonText}>Convert</Text>
                    )}
            </TouchableOpacity>

            {/* Display Results */}
            {result && (
                <View style={styles.resultContainer}>
                    <Text style={styles.resultTitle}>Conversion Result</Text>
                    <Text style={styles.resultText}>
                        {amount} {baseCurrency} = {result.convertedAmount} {destinationCurrency}
                    </Text>
                    <Text style={styles.rateText}>
                        Exchange Rate: 1 {baseCurrency} = {result.exchangeRate} {destinationCurrency}
                    </Text>
                </View>
            )}

            {/* Navigate to AboutScreen */}
            <TouchableOpacity style={styles.aboutButton} onPress={() => navigation.navigate("About")}>
                <Text style={styles.aboutButtonText}>About</Text>
            </TouchableOpacity>
        </View>
    );

}