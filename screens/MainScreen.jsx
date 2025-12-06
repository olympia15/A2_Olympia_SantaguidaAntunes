import { useState } from "react";

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

    }





}