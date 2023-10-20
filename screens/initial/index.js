import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import { View } from "react-native";
import wordGender from "../../dictionary/wordGender";
import { Button, Dialog, Input, Text } from "@rneui/themed";

const pronounsOpts = [
    { label: "Neutros", value: "N" },
    { label: "Masculinos", value: "M" },
    { label: "Femininos", value: "F" },
    { label: "Alternados", value: "A" },
];

function Initial() {
    const [username, setUsername] = useState("");
    const [pronouns, setPronouns] = useState("");

    const [warnDialog, setWarnDialog] = useState();
    const [confirmDialog, setConfirmDialog] = useState();

    const handleConfirmation = () => {};

    const handleSubmit = async () => {
        if (!username)
            return setWarnDialog({ title: "Oops!", message: "Você não escolheu seu nome!" });
        if (!pronouns)
            return setWarnDialog({ title: "Oops!", message: "Você não escolheu seus pronomes!" });

        const pronounsLabel = pronounsOpts.find(({ value }) => value === pronouns).label;

        const words = {
            chamada: wordGender("chamada", pronouns),
        };

        setConfirmDialog({ pronounsLabel, words, username });
    };

    return (
        <View>
            <View>
                <Text>Meu nome é:</Text>

                <Input value={username} onChangeText={setUsername} placeholder="Meu nome é:" />
            </View>

            <View>
                <Text>Eu uso pronomes:</Text>

                <Picker
                    placeholder="Eu uso pronomes:"
                    prompt="Eu uso pronomes:"
                    selectedValue={pronouns}
                    onValueChange={(val) => setPronouns(val)}
                >
                    <Picker.Item label={"Selecione"} value={""} />

                    {pronounsOpts.map(({ label, value }, i) => (
                        <Picker.Item key={i} label={label} value={value} />
                    ))}
                </Picker>
            </View>

            <Button
                title="Entrar"
                icon={{ name: "login", type: "ant-design", color: "white" }}
                iconPosition="right"
                size="lg"
                raised
                onPress={handleSubmit}
            />

            <Dialog isVisible={!!warnDialog} onBackdropPress={() => setWarnDialog()}>
                <Dialog.Title title={warnDialog?.title} />

                <Text>{warnDialog?.message}</Text>
            </Dialog>

            <Dialog isVisible={!!confirmDialog} onBackdropPress={() => setConfirmDialog()}>
                <Dialog.Title title="Confirmar" />

                <Text>{`Você escolheu os pronomes ${confirmDialog?.pronounsLabel} e ser ${confirmDialog?.words.chamada} de ${confirmDialog?.username}!`}</Text>

                <Text>Deseja confirmar?</Text>

                <Dialog.Actions>
                    <Dialog.Button title="Sim!" onPress={handleConfirmation} />
                    <Dialog.Button title="Não!" onPress={() => setConfirmDialog()} />
                </Dialog.Actions>
            </Dialog>
        </View>
    );
}

export default Initial;
