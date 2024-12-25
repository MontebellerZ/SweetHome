import styles from "./styles";
import { useState, useEffect, useMemo } from "react";
import { View, Image, ImageBackground } from "react-native";
import { Button } from "@rneui/themed";
import {
    Dialog,
    Text,
    Button as Button2,
    Portal,
    TextInput,
    HelperText,
    ActivityIndicator,
} from "react-native-paper";
import DropDown from "react-native-paper-dropdown";
import wordGender, { pronounsOpts } from "../../dictionary/wordGender";
import { SaveUser } from "../../api";
import DatePicker from "../../components/DatePicker";
import Logo from "../../imgs/branding/logo512.png";
// import Bg1 from "../../imgs/backgrounds/particles_gradient.png";
// import Bg2 from "../../imgs/backgrounds/shiny_gradient.png";
import Bg3 from "../../imgs/backgrounds/waves_gradient.png";
import { basicColors } from "../../theme";

const START_DATE = new Date();
START_DATE.setFullYear(START_DATE.getFullYear() - 100);

const END_DATE = new Date();
END_DATE.setFullYear(END_DATE.getFullYear() - 16);

const getBackground = (bgIndex = null) => {
    // const backgrounds = [Bg1, Bg2, Bg3];
    const backgrounds = [Bg3];

    if (bgIndex !== null) return backgrounds[bgIndex];

    const randPos = Math.floor(Math.random() * backgrounds.length);

    return backgrounds[randPos];
};

function Initial({ navigation }) {
    const background = useMemo(getBackground, []);

    const [firstLoadUsername, setFirstLoadUsername] = useState(true);
    const [firstLoadPronouns, setFirstLoadPronouns] = useState(true);
    const [firstLoadBirthday, setFirstLoadBirthday] = useState(true);

    const [username, setUsername] = useState("");
    const [pronouns, setPronouns] = useState("");
    const [birthday, setBirthday] = useState(undefined);

    const [showPronouns, setShowPronouns] = useState(false);

    const [warnDialog, setWarnDialog] = useState();
    const [confirmDialog, setConfirmDialog] = useState();

    const usernameError = !firstLoadUsername && !username;
    const pronounsError = !firstLoadPronouns && !pronouns;
    const birthdayError = !firstLoadBirthday && !birthday;

    const errorsLabel = [
        { error: usernameError, label: "Escolha seu nome!" },
        { error: pronounsError, label: "Escolha seus pronomes!" },
        { error: birthdayError, label: "Escolha seu aniversário!" },
    ];

    const handleConfirmation = () => {
        SaveUser(username, pronouns).then((user) => {
            return navigation.reset({
                index: 0,
                routes: [{ name: "Home", params: { user } }],
            });
        });
    };

    const handleSubmit = async () => {
        const requiredFields = [
            { value: username, state: setFirstLoadUsername, label: "seu nome" },
            { value: pronouns, state: setFirstLoadPronouns, label: "seus pronomes" },
            { value: birthday, state: setFirstLoadBirthday, label: "seu aniversário" },
        ];

        const missingInputs = requiredFields.filter((field) => !field.value);

        if (missingInputs.length > 0) {
            missingInputs.forEach(({ state }) => state(false));

            let missingString = missingInputs.map((field) => field.label).join(", ");

            if (missingInputs.length > 1) {
                const lastCommaIndex = missingString.lastIndexOf(", ");
                missingString =
                    missingString.substring(0, lastCommaIndex) +
                    " e " +
                    missingString.substring(lastCommaIndex + 2);
            }

            const warningMessage = `Você não escolheu ${missingString}!`;
            setWarnDialog({ title: "Oops!", message: warningMessage });
            return;
        }

        const pronounsLabel = pronounsOpts.find(({ value }) => value === pronouns)?.label;

        const words = {
            chamada: wordGender("chamada", pronouns),
        };

        setConfirmDialog({
            pronounsLabel,
            words,
            username,
            birthday: birthday.toLocaleDateString(),
        });
    };

    useEffect(() => {
        if (username) setFirstLoadUsername(false);
    }, [username]);

    useEffect(() => {
        if (pronouns) setFirstLoadPronouns(false);
    }, [pronouns]);

    useEffect(() => {
        if (birthday) setFirstLoadBirthday(false);
    }, [birthday]);

    return (
        <ImageBackground style={styles.container} source={background}>
            <View style={styles.header}>
                <Image source={Logo} style={styles.logo} pla={<ActivityIndicator />} />

                <View>
                    <Text variant="displayMedium" style={styles.title}>
                        Sweet
                    </Text>
                    <Text variant="displayMedium" style={styles.title}>
                        Home
                    </Text>
                </View>
            </View>

            <View style={styles.form}>
                <View>
                    {/* <Text variant="titleMedium" style={styles.label}>
                        Meu nome é:
                    </Text> */}

                    <TextInput
                        mode="outlined"
                        // label="Nome"
                        label="Meu nome é"
                        // placeholder="Nome"
                        placeholder="Meu nome é"
                        value={username}
                        onChangeText={setUsername}
                        error={usernameError}
                    />
                    {/* <HelperText type="error" visible={usernameError}>
                        Escolha seu nome!
                    </HelperText> */}
                </View>

                <View>
                    {/* <Text variant="titleMedium" style={styles.label}>
                        Meus pronomes são:
                    </Text> */}

                    <DropDown
                        mode={"outlined"}
                        // label={"Pronomes"}
                        label={"Meus pronomes são"}
                        visible={showPronouns}
                        showDropDown={() => setShowPronouns(true)}
                        onDismiss={() => setShowPronouns(false)}
                        list={pronounsOpts}
                        value={pronouns}
                        setValue={setPronouns}
                    />
                    {/* <HelperText type="error" visible={pronounsError}>
                        Escolha seus pronomes!
                    </HelperText> */}
                </View>

                <View>
                    {/* <Text variant="titleMedium" style={styles.label}>
                        Minha data de nascimento é:
                    </Text> */}

                    <DatePicker
                        date={birthday}
                        mode={"outlined"}
                        // label={"Nascimento"}
                        label={"Minha data de nascimento é"}
                        onConfirm={setBirthday}
                        validRange={{ startDate: START_DATE, endDate: END_DATE }}
                        error={birthdayError}
                    />
                    {/* <HelperText type="error" visible={birthdayError}>
                        Escolha seu aniversário!
                    </HelperText> */}
                </View>

                <HelperText type="error" visible={usernameError || pronounsError || birthdayError}>
                    {errorsLabel
                        .filter(({ error }) => error)
                        .map(({ label }) => label)
                        .join("\n")}
                </HelperText>

                <Button
                    title="Entrar"
                    icon={{ name: "login", type: "ant-design", color: "white" }}
                    iconPosition="right"
                    size="lg"
                    raised
                    onPress={handleSubmit}
                    style={styles.submit}
                    disabled={!username || !pronouns || !birthday}
                />
            </View>

            <Portal>
                <Dialog visible={!!warnDialog} onDismiss={() => setWarnDialog()}>
                    <Dialog.Icon icon="alert" color={basicColors.error} />

                    <Dialog.Title style={styles.dialogTitle}>{warnDialog?.title}</Dialog.Title>

                    <Dialog.Content>
                        <Text style={styles.dialogText} variant="bodyMedium">
                            {warnDialog?.message}
                        </Text>
                    </Dialog.Content>
                </Dialog>

                <Dialog visible={!!confirmDialog} onDismiss={() => setConfirmDialog()}>
                    <Dialog.Icon icon="cloud-check" />

                    <Dialog.Title style={styles.dialogTitle}>Confirmar</Dialog.Title>

                    <Dialog.Content>
                        <Text style={styles.dialogText} variant="bodyMedium">
                            Seu nome é{" "}
                            <Text style={styles.dialogBold}>{confirmDialog?.username}</Text>, você
                            usa os pronomes{" "}
                            <Text style={styles.dialogBold}>{confirmDialog?.pronounsLabel}</Text> e
                            nasceu em{" "}
                            <Text style={styles.dialogBold}>{confirmDialog?.birthday}</Text>!
                        </Text>
                    </Dialog.Content>

                    <Dialog.Content>
                        <Text style={styles.dialogText} variant="bodyMedium">
                            Está tudo correto?
                        </Text>
                    </Dialog.Content>

                    <Dialog.Actions style={styles.dialogActions}>
                        <Button2 onPress={() => handleConfirmation()}>Sim!</Button2>
                        <Button2 onPress={() => setConfirmDialog()}>Não!</Button2>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </ImageBackground>
    );
}

export default Initial;
