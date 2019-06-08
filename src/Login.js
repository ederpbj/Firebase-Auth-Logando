import React, { Component } from 'react';
import { View, Text, StyleSheet,  Button } from 'react-native';
import firebase from 'firebase';
import { TextInput } from 'react-native-paper';

export default class SegundoProjeto extends Component {

	constructor(props){
		super(props);
		this.state = {
			email:'',
			senha:'',
		};

		//Cadastro das funções
		this.cadastrar = this.cadastrar.bind(this);
		this.logar = this.logar.bind(this);
		this.sair = this.sair.bind(this);

		let firebaseConfig = {
			apiKey: "AIzaSyByOuxsAqVORH1BhNFkOfTmu2-KhybMYQs",
			authDomain: "projeto-teste-cceff.firebaseapp.com",
			databaseURL: "https://projeto-teste-cceff.firebaseio.com",
			projectId: "projeto-teste-cceff",
			storageBucket: "projeto-teste-cceff.appspot.com",
			messagingSenderId: "105683966485",
			appId: "1:105683966485:web:e875aa024ae96846"
		  };
		  
		  firebase.initializeApp(firebaseConfig);

		  //Deslogar
		  //firebase.auth().signOut();

		  //Listener
		  firebase.auth().onAuthStateChanged((user)=>{
			  if(user){
				  this.props.navigation.navigate("Logged")
				  //alert("Login realizado com sucesso!")
			  }else{
				  alert("Faça login para acessar o sistema!");
			  }
		  });


	}

	cadastrar(){
		firebase.auth().createUserWithEmailAndPassword(
			this.state.email, 
			this.state.senha
		).catch((error)=> {
			//descobrindo erros
			//alert(error.code);

			switch (error.code) {
				case 'auth/invalid-email':
					alert("Digite um email valido!")
					break;
				case 'auth/weak-password':
					alert("Digite uma senha com mais de 6 caracteres!")
					break;
				case 'auth/invalid-email':
					alert("Digite um email valido!")
					break;
				case 'auth/email-already-in-use':
					alert("Este email já possui cadastro!")
					break;
				default:
					alert("Ocorreu um erro! Mantenha contado com desenvolvedor: 9998-9999 Erro: "+error.code)
					break;
			}

		});
		

	}

	logar(){
		
		firebase.auth().signInWithEmailAndPassword(
			this.state.email, 
			this.state.senha
		).catch((error) => {
			if(error.code == 'auth/wrong-password'){
				alert("Senha incorreta!")
			}else{
				alert("Tente novamente mais tarde!")
			}
		});

		
	}

	sair(){
		firebase.auth().signOut();
	}

	render(){
		return(
			<View style={styles.container}>
				<Text>E-mail:</Text>				
				<TextInput onChangeText={(email) => this.setState({email})} style={styles.input} />
				
				<Text>Senha:</Text>				
				<TextInput secureTextEntry={true} onChangeText={(senha) => this.setState({senha})} style={styles.input} />

				
				<Button color='#00FF00' title="Logar" onPress={this.logar} style={styles.botaoLogar} />
				<Button title="Cadastrar" onPress={this.cadastrar} />
				<Button color='#0000FF' title="Sair" onPress={this.sair} />
			</View>
		);
	}

}

const styles = StyleSheet.create({
	container:{
		flex:1,
		marginTop:20,
		padding:20
	},
	input:{
		height:60,
		borderWidth:1,
		borderColor:'#000000',
		margin:10
	},
	botao:{
		//backgroundColor:'#00FF00',
		color:'#00FF00'
	}
})
