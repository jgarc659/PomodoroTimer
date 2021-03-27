import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, TextInput, Vibration, Image } from 'react-native';

const App = props => {

  const [running, setRunning] = useState(false);
  const [work, setWork] = useState(true);
  
  const [workMins, setWorkMins] = useState(5);
  const [workSecs, setWorkSecs] = useState(0);

  const [breakMins, setBreakMins] = useState(5);
  const [breakSecs, setBreakSecs] = useState(0);

  const [currentMinutes, setCurrentMinutes] = useState(workMins);
  const [currentSeconds, setCurrentSeconds] = useState(workSecs);

  const [counter, setCounter] = useState(undefined);

  const [minuteString, setMinuteString] = useState('');
  const [secondString, setSecondString] = useState('');

  
  useEffect(() => {
    setRunning(true);
  }, []);

  useEffect(() => {
    
    if (!running) {
      return;
    }
    const counter = setInterval(countDown, 1000);
    return () => clearInterval(counter);

  }, [running, currentMinutes, currentSeconds]);

  const countDown = () => {
    if (currentSeconds > 0) {
      let updatedSeconds = currentSeconds-1;
      setCurrentSeconds(updatedSeconds);
    }
    else {
      if (currentMinutes == 0) {
        let updatedTimerType = !work;
        setWork(updatedTimerType);
      }
      else {
        let updatedMinutes = currentMinutes-1;
        setCurrentMinutes(updatedMinutes);
        setCurrentSeconds(59);
      }
    }
  };

  useEffect(() => {
    if (work) {
      setCurrentMinutes( workMins );
      setCurrentSeconds( workSecs );

    }
  }, [work, workMins, workSecs]);

  useEffect(() => {
    if (!work) {
      setCurrentMinutes( breakMins );
      setCurrentSeconds( breakSecs );

    }
  }, [work, breakMins, breakSecs]);

  const pauseOrStart = () => {
    let updatedRunning = !running;
    setRunning(updatedRunning);
  };

  const updateWorkMins = (newWorkMins) => {
    setWorkMins(Number(newWorkMins));
  };

  const updateWorkSecs = (newWorkSecs) => {
    setWorkSecs(Number(newWorkSecs));
  };

  const updateBreakMins = (newBreakMins) => {
    setBreakMins(Number(newBreakMins));
  };

  const updateBreakSecs = (newBreakSecs) => {
    setBreakSecs(Number(newBreakSecs));
  };

  const reset = () => {
      if (work) {
        setRunning(false);
        setCurrentSeconds(workSecs);
        setCurrentMinutes(workMins);
      }
      else {
        setRunning(false);
        setCurrentSeconds(breakSecs);
        setCurrentMinutes(breakMins);
      }
  };

  useEffect( () => {
    (currentMinutes == 0) && (currentSeconds == 0) && Vibration.vibrate([500, 500, 500]);

    (currentMinutes < 10) ? (setMinuteString('0' + currentMinutes)) : (setMinuteString('' + currentMinutes));

    (currentSeconds < 10) ? (setSecondString('0' + currentSeconds)) : (setSecondString('' + currentSeconds));
  }, [counter, currentMinutes, currentSeconds, minuteString, secondString]);
  

  return (
    
    <SafeAreaView style={styles.safeAreaView}> 
      <View style={styles.box}>
      
        {(work && <Text style={styles.header}>Work Timer</Text>) || <Text style={styles.header}>Break Timer</Text>}
        <Image style={styles.logo} source={{uri: 'https://webstockreview.net/images/hourglass-clipart-basic-18.png'}}/>
        <Text style={styles.header}>{minuteString.toString()}:{secondString.toString()}</Text>
        <View style={styles.row}>
          <TouchableOpacity style={styles.touchable} onPress={pauseOrStart}>
            { (running && <Text style={styles.boldText}>  PAUSE  </Text>) || (<Text style={styles.boldText}>  START  </Text>)}
          </TouchableOpacity>
          <TouchableOpacity style={styles.touchable} onPress={reset} >
            <Text style={styles.boldText}>  RESET  </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.box}>

        <View style={styles.userInputRow}> 
          <View style={styles.rowSection}><Text style={styles.boldText}>  Work Time:</Text></View>
          <View style={styles.rowSection}>
            <Text style={styles.text}>  Minutes: </Text>
            <TextInput style={styles.inputBox} value={''+workMins} keyboardType='numeric'
            onChangeText={(newWorkMins) => updateWorkMins(newWorkMins)}/>
          </View>
          <View style={styles.rowSection}>
            <Text style={styles.text}>  Seconds: </Text>
            <TextInput style={styles.inputBox} value={''+workSecs} keyboardType='numeric'
            onChangeText={(newWorkSecs) => updateWorkSecs(newWorkSecs)}/>
          </View>
        </View>

        <View style={styles.userInputRow}> 
          <View style={styles.rowSection}><Text style={styles.boldText}>  Break Time:</Text></View>
          <View style={styles.rowSection}>
            <Text style={styles.text}>  Minutes: </Text>
            <TextInput style={styles.inputBox} value={''+breakMins} keyboardType='numeric'
            onChangeText={(newBreakMins) => updateBreakMins(newBreakMins)}/>
          </View>
          <View style={styles.rowSection}>
            <Text style={styles.text}>  Seconds: </Text>
            <TextInput style={styles.inputBox} value={''+breakSecs} keyboardType='numeric'
            onChangeText={(newBreakSecs) => updateBreakSecs(newBreakSecs)}/>
          </View>
        </View>

        <View style = {styles.bottomPaddingView}></View>

      </View>

    </SafeAreaView>
  );

  

};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: 'black'
  },
  logo: {
    width: 30,
    height: 30
  },
  header: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 44
  },
  text: {
    color: 'white',
    fontSize: 14
  },
  boldText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  },
  touchable: {
    backgroundColor: 'blue',
    margin: 15,
    padding: 15
  },
  row: {
    flexDirection: 'row'
  },
  userInputRow: {
    flex: 1,
    flexDirection: 'row',
    margin: 15
  },
  inputBox: {
    backgroundColor: 'white',
    borderRadius: 6,
    margin: 5
  },
  rowSection: {
    flex: 1,
    justifyContent: 'center'
  },
  box: {
    flex: 8,
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  bottomPaddingView: {
    flex: 2
  }
  

});



export default App;