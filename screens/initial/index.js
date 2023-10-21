import styles from "./styles";
import { useState, useRef, useEffect } from "react";
import { TouchableOpacity, View } from "react-native";
import { Button } from "@rneui/themed";
import { Dialog, Text, Button as Button2, Portal, TextInput, HelperText } from "react-native-paper";
import DropDown from "react-native-paper-dropdown";
import wordGender, { pronounsOpts } from "../../dictionary/wordGender";
import { SaveUser } from "../../api";
import { DatePickerInput, DatePickerModal } from "react-native-paper-dates";

function Initial({ navigation }) {
    const firstLoadUsername = useRef(true);
    const firstLoadPronouns = useRef(true);
    const firstLoadBirthday = useRef(true);

    const [username, setUsername] = useState("");
    const [pronouns, setPronouns] = useState("");
    const [birthday, setBirthday] = useState(undefined);

    const [showPronouns, setShowPronouns] = useState(false);
    const [showBirthday, setShowBirthday] = useState(false);

    const [warnDialog, setWarnDialog] = useState();
    const [confirmDialog, setConfirmDialog] = useState();

    const usernameError = !firstLoadUsername.current && !username;
    const pronounsError = !firstLoadPronouns.current && !pronouns;
    const birthdayError = !firstLoadBirthday.current && !birthday;

    const handleConfirmation = () => {
        SaveUser(username, pronouns).then((user) => {
            return navigation.reset({
                index: 0,
                routes: [{ name: "Home", params: { user } }],
            });
        });
    };

    const handleSubmit = async () => {
        if (!username) {
            firstLoadUsername.current = false;
            setWarnDialog({ title: "Oops!", message: "Você não escolheu seu nome!" });
            return;
        }
        if (!pronouns) {
            firstLoadPronouns.current = false;
            setWarnDialog({ title: "Oops!", message: "Você não escolheu seus pronomes!" });
            return;
        }

        const pronounsLabel = pronounsOpts.find(({ value }) => value === pronouns).label;

        const words = {
            chamada: wordGender("chamada", pronouns),
        };

        setConfirmDialog({ pronounsLabel, words, username });
    };

    useEffect(() => {
        if (username) firstLoadUsername.current = false;
    }, [username]);

    useEffect(() => {
        if (pronouns) firstLoadPronouns.current = false;
    }, [pronouns]);

    return (
        <View style={styles.container}>
            <View>
                <Text variant="titleMedium" style={styles.label}>
                    Meu nome é:
                </Text>

                <TextInput
                    mode="outlined"
                    label="Nome"
                    placeholder="Nome"
                    value={username}
                    onChangeText={setUsername}
                    error={usernameError}
                />
                <HelperText type="error" visible={usernameError}>
                    Escolha seu nome!
                </HelperText>
            </View>

            <View style={styles.row}>
                <View style={styles.rowItem}>
                    <Text variant="titleMedium" style={styles.label}>
                        Meus pronomes são:
                    </Text>

                    <DropDown
                        mode={"outlined"}
                        label={"Pronomes"}
                        visible={showPronouns}
                        showDropDown={() => setShowPronouns(true)}
                        onDismiss={() => setShowPronouns(false)}
                        list={pronounsOpts}
                        value={pronouns}
                        setValue={setPronouns}
                    />
                    <HelperText type="error" visible={pronounsError}>
                        Escolha seus pronomes!
                    </HelperText>
                </View>

                <View style={styles.rowItem}>
                    <Text variant="titleMedium" style={styles.label}>
                        Meu aniversário é dia:
                    </Text>

                    <View style={{ position: "relative" }}>
                        <TextInput
                            mode="outlined"
                            label="Aniversário"
                            placeholder="Aniversário"
                            value={birthday?.toString()}
                            right={<TextInput.Icon icon="calendar-account" />}
                        />

                        <TouchableOpacity
                            onPress={(e) => {
                                setShowBirthday(true);
                            }}
                            style={{
                                position: "absolute",
                                left: 0,
                                top: 0,
                                right: 0,
                                bottom: 0,
                                zIndex: 1000,
                            }}
                        />
                    </View>
                    <DatePickerModal
                        locale="en-GB"
                        mode="single"
                        visible={showBirthday}
                        date={birthday}
                        onDismiss={() => {
                            setShowBirthday(false);
                        }}
                        onConfirm={({ date }) => {
                            setShowBirthday(false);
                            setBirthday(date);
                        }}
                    />
                    <HelperText type="error" visible={birthdayError}>
                        Escolha seu aniversário!
                    </HelperText>
                </View>
            </View>

            <Button
                title="Entrar"
                icon={{ name: "login", type: "ant-design", color: "white" }}
                iconPosition="right"
                size="lg"
                raised
                onPress={handleSubmit}
                style={styles.submit}
            />

            <Portal>
                <Dialog visible={!!warnDialog} onDismiss={() => setWarnDialog()}>
                    <Dialog.Title style={styles.dialogTitle}>{warnDialog?.title}</Dialog.Title>

                    <Dialog.Content>
                        <Text variant="bodyMedium">{warnDialog?.message}</Text>
                    </Dialog.Content>
                </Dialog>

                <Dialog visible={!!confirmDialog} onDismiss={() => setConfirmDialog()}>
                    <Dialog.Icon icon="cloud-check" />

                    <Dialog.Title style={styles.dialogTitle}>Confirmar</Dialog.Title>

                    <Dialog.Content>
                        <Text style={styles.dialogText} variant="bodyMedium">
                            Você escolheu os pronomes{" "}
                            <Text style={styles.dialogBold}>{confirmDialog?.pronounsLabel}</Text> e
                            ser {confirmDialog?.words.chamada} de{" "}
                            <Text style={styles.dialogBold}>{confirmDialog?.username}</Text>!
                        </Text>

                        <Text style={styles.dialogText} variant="bodyMedium">
                            Deseja confirmar?
                        </Text>
                    </Dialog.Content>

                    <Dialog.Actions style={styles.dialogActions}>
                        <Button2 onPress={() => handleConfirmation()}>Sim!</Button2>
                        <Button2 onPress={() => setConfirmDialog()}>Não!</Button2>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </View>
    );
}

export default Initial;
