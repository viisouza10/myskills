import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Platform,
  FlatList,
} from 'react-native';
import {Button} from '../components/Button';
import {SkillCard} from '../components/SkillCard';

export interface SkillData{
  id:string;
  name:string;
}

export function Home() {
  const [newSkill, setNewSkill] = useState('');
  const [mySkills, setMySkills] = useState<SkillData[]>([]);
  const [gretting, setGretting] = useState('');

  function handleAddNewSkill() {
    const data = {
      id:String(new Date().getTime()),
      name:newSkill
    }
    console.log("New Skill",data)

    setMySkills(oldState => [...oldState,data]);
  }

  function handleRemoveSkill(id:string){
    setMySkills(oldState => oldState.filter(sk => sk.id !== id))
  }

  useEffect(() =>{
    const currentHour = new Date().getHours();
    if(currentHour < 12){
      setGretting("Good morning")
    }else if(currentHour >= 12 && currentHour < 18){
      setGretting("Good afternoon")
    }else{
      setGretting("Good night")
    }
  },[])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome, Vinicius</Text>
      <Text style={styles.gretting}>{gretting}</Text>

      <TextInput
        style={styles.input}
        placeholder="New Skill"
        placeholderTextColor="#555"
        onChangeText={setNewSkill}
      />

      <Button onPress={handleAddNewSkill}  title={"Add"}/>

      <Text style={[styles.title, {marginVertical: 50}]}>My Skills</Text>
      <FlatList
        data={mySkills}
        keyExtractor={item => item.id}
        renderItem={({item}) => <SkillCard skill={item.name} onPress={() =>handleRemoveSkill(item.id)}/>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121015',
    paddingHorizontal: 30,
    paddingVertical: 70,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  gretting:{
    color: '#fff',
    fontSize: 14,
  },
  input: {
    backgroundColor: '#1f1e25',
    color: '#fff',
    fontSize: 18,
    padding: Platform.OS === 'ios' ? 15 : 10,
    marginTop: 30,
    borderRadius: 7,
  },
});
