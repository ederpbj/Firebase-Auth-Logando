import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, Image, Button } from 'react-native';

export default class Lista extends Component {

	constructor(props) {
		super(props);
		this.state = {
			filmes:[],
			loading:true
		};

		fetch('https://filmespy.herokuapp.com/api/v1/filmes')
			.then((r)=>r.json())
			.then((json)=>{
				let state = this.state;
				state.filmes = json.filmes;
				state.loading = false;
				this.setState(state);
			});

	}

	sair(){
		firebase.auth().signOut();
	}
	
	render() {

		if(this.state.loading) {
			return (
				<View style={[styles.container, styles.loading]}>
					<Text style={styles.loadingTxt}>Carregando...</Text>
				</View>
			);
		} else {
			return (

				<View style={styles.container}>
					<FlatList
						data={this.state.filmes}
						renderItem={({item})=> <Filme data={item} /> }
						keyExtractor={(item, index)=>item.data}
					/>

					<Button color='#0000FF' title="Sair" onPress={this.sair}  />
				</View>
			);
		}
	}

}



class Filme extends Component {

	render() {
		return(
			<View style={styles.filmeArea}>
				<Image source={{uri:this.props.data.poster.replace('http:', 'https:')}} style={styles.filmeImagem} />
				<View style={styles.filmeInfo}>
					<Text style={styles.filmeNome}>{this.props.data.nome}</Text>
					<Text>{this.props.data.data}</Text>
					<Text>{this.props.data.sinopse}</Text>
				</View>

			</View>
		);
	}

}

const styles = StyleSheet.create({
	container:{
		flex:1,
		marginTop:20
	},
	loading:{
		justifyContent:'center',
		alignItems:'center'
	},
	loadingTxt:{
		fontSize:18,
		fontWeight:'bold'
	},
	filmeArea:{
		flex:1,
		flexDirection:'row',
		margin:10
	},
	filmeImagem:{
		width:80,
		height:110
	},
	filmeInfo:{
		flex:1,
		flexDirection:'column',
		marginLeft:10
	},
	filmeNome:{
		fontSize:18,
		fontWeight:'bold'
	}
});