/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

// import React from 'react';
// import {
//   SafeAreaView,
//   ScrollView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   useColorScheme,
//   View,
// } from 'react-native';
// import {
//   Colors,
//   DebugInstructions,
//   Header,
//   LearnMoreLinks,
//   ReloadInstructions,
// } from 'react-native/Libraries/NewAppScreen';

// const Section = ({children, title}) => {
//   const isDarkMode = useColorScheme() === 'dark';
//   return (
//     <View style={styles.sectionContainer}>
//       <Text
//         style={[
//           styles.sectionTitle,
//           {
//             color: isDarkMode ? Colors.white : Colors.black,
//           },
//         ]}>
//         {title}
//       </Text>
//       <Text
//         style={[
//           styles.sectionDescription,
//           {
//             color: isDarkMode ? Colors.light : Colors.dark,
//           },
//         ]}>
//         {children}
//       </Text>
//     </View>
//   );
// };

// const App = () => {
//   const isDarkMode = useColorScheme() === 'dark';

//   const backgroundStyle = {
//     backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
//   };

//   return (
//     <SafeAreaView style={backgroundStyle}>
//       <StatusBar barStyle={isDarkMode ? 'dark-content' : 'light-content'} />
//       <ScrollView
//         contentInsetAdjustmentBehavior="automatic"
//         style={backgroundStyle}>
//         <Header />
//         <View
//           style={{
//             backgroundColor: isDarkMode ? Colors.black : Colors.white,
//           }}>
//           <Text>Haloooo</Text>
//           <Section title="Step One">
//             Edit <Text style={styles.highlight}>App.js</Text> to change this
//             screen and then come back to see your edits.
//           </Section>
//           <Section title="See Your Changes">
//             <ReloadInstructions />
//           </Section>
//           <Section title="Debug">
//             <DebugInstructions />
//           </Section>
//           <Section title="Learn More">
//             Read the docs to discover what to do next:
//           </Section>
//           <LearnMoreLinks />
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400',
//   },
//   highlight: {
//     fontWeight: '700',
//   },
// });

import React, { useState } from 'react';
import { View, Text, 
  TextInput, StyleSheet, 
  TouchableOpacity, FlatList } from 'react-native';

const App = () => {

  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editIndex, setEditIndex] = useState(-1);

  const handleAddtasks = () => {
    if(task) {
      if(editIndex !== -1) {
        const updatedTasks = [...tasks];
        updatedTasks[editIndex] = task;
        setTasks(updatedTasks);
        setEditIndex(-1);
      } else {
        setTasks([...tasks, task]);
      }

      setTask("");
    }
  };

  const handleEditTask = (index) => {
    const taskToEdit = tasks[index];
    setTask(taskToEdit);
    setEditIndex(index);
  }

  const handleDeleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index,1);
    setTasks(updatedTasks);
  }

  const renderItem = ({ item, index }) => (
    <View style={style.task}>
        <Text
            style={style.item}>{item}</Text>
        <View style={style.taskButtons}>
            <TouchableOpacity
                onPress={() => handleEditTask(index)}>
                <Text style={style.editButton}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => handleDeleteTask(index)}>
                <Text style={style.deleteButton}>Delete</Text>
            </TouchableOpacity>
        </View>
    </View>
);

  return (
    <View style={style.container}>
      <Text style={style.h1}>My Todo List React Native</Text>
      <TextInput
          style={style.input}
          placeholder="Enter task"
          value={task}
          onChangeText={(text) => setTask(text)}
      />
      <TouchableOpacity
          style={style.addButton}
          onPress={handleAddtasks}>
          <Text style={style.addButtonText}>
              {editIndex !== -1 ? "Update Task" : "Add Task"}
          </Text>
      </TouchableOpacity>
      <FlatList
          data={tasks}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const style = StyleSheet.create ({
  container : {
    padding: 50,
  },
  h1: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
    color: '#EA1179'
  },
  input: {
    borderWidth: 2,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 20,
    borderRadius: 10,
    fontSize: 18,
  },
  addButton: {
    padding: 15,
    backgroundColor: '#EA1179',
    borderRadius: 5,
    marginBottom: 20,
  },
  addButtonText: {
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'white',
  },
  task: {
    flexDirection: 'row',
    justifyContent:'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  taskButtons: {
    flexDirection: 'row',
  },
  editButton: {
    color: 'green',
    fontWeight: 'bold',
    fontSize: 18,
    marginRight: 10,
  },
  deleteButton: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 18,
  },
  item: {
    fontSize: 20,
  }
})

export default App;
