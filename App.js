import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { Avatar, Button, Input } from 'react-native-elements';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';

function LoginScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <View style={{ marginVertical: 20 }}>
        <Avatar
          size={100}
          rounded
          icon={{ name: "user", type: "font-awesome" }}
          containerStyle={{ backgroundColor: "#0000FF" }}
        />
      </View>

      <Text style={styles.label}>Login</Text>
      <Input placeholder='' />

      <Text style={styles.label}>Senha</Text>
      <Input placeholder="" secureTextEntry={true} />

      <Button
        title='Logar'
        onPress={() => navigation.navigate('Listacontatos')}
        buttonStyle={{ backgroundColor: '#007AFF', borderRadius: 10, marginVertical: 5 }}
        titleStyle={{ fontWeight: 'bold', fontSize: 18 }}
      />
      <Button
        title="Cadastrar"
        onPress={() => navigation.navigate('Cadastrousuario')}
        buttonStyle={{ backgroundColor: '#FF3B30', borderRadius: 10, marginVertical: 5 }}
        titleStyle={{ fontWeight: 'bold', fontSize: 18 }}
      />
    </View>
  );
}

function CadastroUsuario() {
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const Salvar = () => {
    axios.post('http://localhost:3000/usuarios', {
      nome: nome,
      cpf: cpf,
      email: email,
      senha: senha
    })
    .then(response => {
      console.log(response);
      navigation.navigate('LoginScreen');
    })
    .catch(error => {
      console.log(error);
    });
  };
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text style={styles.label}>Nome</Text>
      <TextInput value={nome} onChangeText={setNome} />
      <Text style={styles.label}>Cpf</Text>
      <TextInput value={cpf} onChangeText={setCpf} />
      <Text style={styles.label}>Email</Text>
      <Input value={email} onChangeText={setEmail} />
      <Text style={styles.label}>Senha</Text>
      <Input secureTextEntry={true} value={senha} onChangeText={setSenha} />
      <Button title="Salvar" onPress={Salvar} buttonStyle={{ backgroundColor: '#007AFF', borderRadius: 10, marginVertical: 5 }} />
    </View>
  );
}

function ListacontatosScreen({ navigation }) {
  const [contatos, setContatos] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/contatos')
      .then(response => setContatos(response.data))
      .catch(error => console.log('Erro ao buscar contatos:', error));
  }, []);

  return (
    <View style={{ flex: 1, padding: 16, backgroundColor: '#E6F0FF' }}>
      <TouchableOpacity onPress={() => navigation.navigate('Cadastrocontato')}>
        <Ionicons name="add" size={28} color="#007AFF" />
      </TouchableOpacity>
      <FlatList
        data={contatos}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 20, flexDirection: 'row', alignItems: 'center', marginVertical: 8 }}>
            <Avatar size={100} rounded icon={{ name: "user", type: "font-awesome" }} containerStyle={{ backgroundColor: "#0000FF" }} />
            <TouchableOpacity onPress={() => navigation.navigate('Contatos', { contato: item })}>
              <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.nome}</Text>
              <Text style={{ fontSize: 18 }}>{item.telefone}</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

function inserirDadosContato(nome, email, telefone) {
  axios.post('http://localhost:3000/contatos', {
    nome,
    email,
    telefone,
  })
    .then(response => console.log(response))
    .catch(error => console.log(error));
}

function Cadastrocontato() {
  const [nome, setNome] = useState();
  const [email, setEmail] = useState();
  const [telefone, setTelefone] = useState();

  const Salvar = () => {
    axios.post('http://localhost:3000/contatos', {
      nome: nome,
      email: email,
      telefone:telefone
    })
    .then(response => {
      console.log(response);
      navigation.navigate('ListacontatosScreen');
    })
    .catch(error => {
      console.log(error);
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nome</Text>
      <TextInput value={nome} onChangeText={setNome} />
      <Text style={styles.label}>Email</Text>
      <TextInput value={email} onChangeText={setEmail} />
      <Text style={styles.label}>Telefone</Text>
      <TextInput value={telefone} onChangeText={setTelefone} />
      <Button title="Salvar" onPress={Salvar} buttonStyle={{ backgroundColor: '#007AFF', borderRadius: 10, marginVertical: 5 }} />
    </View>
  );
}

function excluirDados(id) {
  axios.delete(http://localhost:3000/contatos/${id})
    .then(response => console.log(response))
    .catch(error => console.log(error));
}

function alterarDados(id, nome, email, telefone) {
  axios.put(http://localhost:3000/contatos/${id}, {
    nome,
    email,
    telefone,
  })
    .then(response => console.log(response))
    .catch(error => console.log(error));
}

function Contatos({ route }) {
  const { contato } = route.params;
  const [nome, setNome] = useState(contato.nome);
  const [email, setEmail] = useState(contato.email);
  const [telefone, setTelefone] = useState(contato.telefone);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nome</Text>
      <TextInput value={nome} onChangeText={setNome} />
      <Text style={styles.label}>Email</Text>
      <TextInput value={email} onChangeText={setEmail} />
      <Text style={styles.label}>Telefone</Text>
      <TextInput value={telefone} onChangeText={setTelefone} />
      <Button title="Alterar" onPress={() => alterarDados(contato.id, nome, email, telefone)} buttonStyle={{ backgroundColor: '#007AFF', borderRadius: 10, marginVertical: 5 }} />
      <Button title="Excluir" onPress={() => excluirDados(contato.id)} buttonStyle={{ backgroundColor: '#FF3B30', borderRadius: 10, marginVertical: 5 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6F0FF',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  label: {
    color: '#000000',
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    marginVertical: 5,
  },
});

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Listacontatos" component={ListacontatosScreen} />
        <Stack.Screen name="Cadastrousuario" component={CadastroUsuarioScreen} />
        <Stack.Screen name="Cadastrocontato" component={CadastrocontatoScreen} />
        <Stack.Screen name="Contato" component={ContatoScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
