import { Text, View } from "react-native";

export default function AboutScreen(){
    return(
        <View style={styles.container}>
            <Text style={styles.title}>About</Text>
            <View style={styles.aboutContainer}>
                <Text style={styles.aboutLabel}>Name:</Text>
                <Text style={styles.aboutText}>Olympia Santaguida-Antunes</Text>
                <Text style={styles.aboutLabel}>Student ID:</Text>
                <Text style={styles.aboutText}>101469745</Text>

                <Text style={styles.aboutLabel}>Name:</Text>
                <Text style={styles.aboutText}>Gabriel Aparicio</Text>
                <Text style={styles.aboutLabel}>Student ID:</Text>
                <Text style={styles.aboutText}>101419420</Text>

                <Text style={styles.aboutLabel}>Application Description:</Text>
                <Text style={styles.aboutDescription}>
                This is a Currency Converter application that allows users to convert
                amounts between different currencies using real-time exchange rates.
                </Text>
            </View>
        </View>
    )
}