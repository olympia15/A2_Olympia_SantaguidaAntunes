import { useState } from "react";

export default function MainScreen({ navigation }) {

    // set the default states
    const [baseCurrency, setBaseCurrency] = useState("CAD");
    const [destinationCurrency, setDestinationCurrency] = useState("");
    const [result, setResult] = useState(null);
    const [amount, setAmount] = useState("1");
    const [loading, setLoading] = useState(false);

    



}