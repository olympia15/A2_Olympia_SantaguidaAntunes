import { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View, ActivityIndicator } from "react-native";

export default function MainScreen({ navigation }) {

    const [baseCurrency, setBaseCurrency] = useState("CAD");
    const [destinationCurrency, setDestinationCurrency] = useState("");
    const [result, setResult] = useState(null);
    const [amount, setAmount] = useState("1");
    const [loading, setLoading] = useState(false);

    const validateCurrencyCode = (code) => /^[A-Z]{3}$/.test(code);
    const validateAmount = (value) => {
        const number = parseFloat(value);
        return !isNaN(number) && number > 0;
    };

    const convertCurrency = async () => {
        if (!validateCurrencyCode(baseCurrency)) {
            Alert.alert("Invalid Input", "Base currency must be a 3 letter uppercase code.");
            return;
        }

        if (!validateCurrencyCode(destinationCurrency)) {
            Alert.alert("Invalid Input", "Destination currency must be a 3 letter uppercase code.");
            return;
        }

        if (!validateAmount(amount)) {
            Alert.alert("Invalid Input", "Amount must be a positive number.");
            return;
        }

        setLoading(true);
        setResult(null);

        try {
            const apiKey = "fca_live_Au4AfANuiZfOWK2wm2F2V4Q7ANadOeH775JlW5M1";
            const response = await fetch(
                `https://api.freecurrencyapi.com/v1/latest?apikey=${apiKey}&base_currency=${baseCurrency}`
            );

            if (!response.ok) {
                if (response.status === 401) throw new Error("Invalid API key.");
                if (response.status === 422) throw new Error("Invalid currency code.");
                throw new Error("Failed to get exchange rates.");
            }

            const data = await response.json();

            if (!data.data || !data.data[destinationCurrency]) {
                throw new Error(`Exchange rate for ${destinationCurrency} not found.`);
            }

            const exchangeRate = data.data[destinationCurrency];
            const convertedAmount = parseFloat(amount) * exchangeRate;

            setResult({
                convertedAmount: convertedAmount.toFixed(2),
                exchangeRate: exchangeRate.toFixed(4),
            });

        } catch (error) {
            Alert.alert("Error", error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Currency Converter</Text>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Base Currency</Text>
                <TextInput
                    style={styles.input}
                    value={baseCurrency}
                    onChangeText={setBaseCurrency}
                    placeholder="CAD"
                    autoCapitalize="characters"
                    maxLength={3}
                />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Destination Currency</Text>
                <TextInput
                    style={styles.input}
                    value={destinationCurrency}
                    onChangeText={setDestinationCurrency}
                    placeholder="USD"
                    autoCapitalize="characters"
                    maxLength={3}
                />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Amount</Text>
                <TextInput
                    style={styles.input}
                    value={amount}
                    onChangeText={setAmount}
                    placeholder="1"
                    keyboardType="numeric"
                />
            </View>

            <TouchableOpacity
                style={[styles.button, loading && styles.buttonDisabled]}
                onPress={convertCurrency}
                disabled={loading}
            >
                {loading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text style={styles.buttonText}>Convert</Text>
                )}
            </TouchableOpacity>

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

            <TouchableOpacity style={styles.aboutButton} onPress={() => navigation.navigate("About")}>
                <Text style={styles.aboutButtonText}>About</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      paddingTop: 60,
      backgroundColor: "#f9f9f9",
    },
    title: {
      fontSize: 26,
      fontWeight: "bold",
      marginBottom: 20,
      textAlign: "center",
      color: "#333",
    },
    inputContainer: {
      marginBottom: 20,
    },
    label: { fontWeight: "600", marginBottom: 5 },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 10,
        borderRadius: 5,
        fontSize: 16,
    },
    button: {
        backgroundColor: "#007AFF",
        padding: 15,
        borderRadius: 5,
        alignItems: "center",
        marginTop: 10,
    },
    buttonDisabled: { backgroundColor: "#8EBEFF" },
    buttonText: { color: "#fff", fontWeight: "bold", fontSize: 18 },
    resultContainer: { marginTop: 20, padding: 15, backgroundColor: "#f1f1f1", borderRadius: 5 },
    resultTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
    resultText: { fontSize: 16 },
    rateText: { fontSize: 14, color: "#555", marginTop: 10 },
    aboutButton: { marginTop: 30, padding: 10, alignItems: "center" },
    aboutButtonText: { color: "#007AFF", fontWeight: "bold", fontSize: 16 },
});
