

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { Dialogflow_V2 } from "react-native-dialogflow"
import { GiftedChat, Composer } from "react-native-gifted-chat";
import Voice from 'react-native-voice';
import moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome';

import Tts from 'react-native-tts';







export default class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      text: '',
      response: '',
      type: 'text'
    };



  }

  componentDidMount() {

    this.setState({
      messages: [
        {
          _id: 1,
          text: "Hello Sagar! I'am Vainilla How can i help you?",
          createdAt: new Date(),
          user: {
            _id: 2,
            name: "Vainilla",
            avatar: "https://randomuser.me/api/portraits/women/57.jpg"
          }
        }
      ]
    });




    Dialogflow_V2.setConfiguration(
      'jarvis@newagent-unjfcl.iam.gserviceaccount.com',
      "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDosnM6kCxzYjqT\nh7civJVYl2u4w0BKDgOKoORZpy183TaHMJTB7l2DyaFX5E+SnOUZJEofdJJQ7G3d\n67nXQpeCmmIkOQY7H2HFqbrcJGyyPpbg5Ao2M9pkf+Zeh2x/LKgLggSEvIskLVLg\nLeC13oEWsxuAj/Gna9J/xO2UGBI/WIkKSdfsDutGvJo4FdUGmpk9pXNJNO5Te8DI\nKCZPye8TgF3YqkxRlkVS2VM/PTSIHlfYxGRACW9ou0qSsqzDp5aoChVsfG1REwA1\nQgjapKQ/SPofK6ZjpBymAHHqYeSxzGxOx3ZYh8V0vNv+6gOmv7qCRisw9tpe2kwV\nDmjxU7YXAgMBAAECggEATW8Ioj3U1OakqHBalGAd8Jee3KJ4s8v7CLgmlODpZao1\nWYJkli5MhyzjGFzcz+SO5jFpyxLfF7e9jcJCGuxJf8gBDZ2+QZFdV0n2aQhj9WKX\nkanA7i2OKLBZCC7Xf3BsUTwIZeVaBgVhFUGfC9ZJrbSXW85Ks5RRPXxaNNRXyiT5\nB8QgWpABF7d/hQ9M2jD2LCH2ubegLGyzW5fiXdDP3haS09BOD2ZjLmIv/CxSGNd6\niIjlXLstN6gcXfH3Gqep5HjSOKqdv/hjmR3Gt/z+1+2p5iAsNVsr6wEFyqwDxd+3\nb/XrU/fAS14Xvs4yldL6IsIiJSltSiMoSS13nX4eaQKBgQD/LJxnviZ9EUDOGKIH\nGaFC5Z33MqBG3oKI/lHT4MoTjLM4WU7iLmEdvBnGkO27UgTWGRV5kJd0d+dShhof\ngnfu2DzAm1eXYCzUnDhmMYuW8jkxu9c5U6L6urYHpAjM4OtT6hr/qlu8ZyrI9W9S\neae9iyzVB12EWfZgodq7YS2T2QKBgQDpczgEIrSFVk2xAxOYqYJGXFjwrFxAcFsa\nMS4z/MICyAt8KJoSD5NWf6787S2xUdS/8f1X2K6pycyjUFpNPLFprZNqvSSwoQjH\n1PVgaTVVAz5mBwFcNKROh4UHL/6GY3DjhtKiSlW0QJxxrKJJmFGVcjWrLmkyYtEf\nEPoFTCOTbwKBgF1gR8O204LEw4Anh3Mtr9M5DzscLYaBeicDWZI9GfVZcWPXWoRu\nEF+/K3d8JWJ8uwRVnYQkoyedkOqj4/9P0O939ZNNxRnBueX7XLAYxUnxTXijkjiK\nIIO7u0zEe+vtCnBkpIiWIIerAP8UwS3fEsDLoxY5YcFC4mOuFsqm3vTRAoGAdkFF\nSOMDqt9y743taVHEijvRWekVuhawL25mRzNsW9hV6QjwMuHs8s4vKDRFByO6r5i3\nir5ai+uLW9ciRynNfQjOOi2h3k9UkVWRDst8lpnUC/7Uc46/BIClpGRtfEn3L2pm\nXItnKq3oEbUvaDReb2OxSAt0gm+IG0KQRAqzosUCgYBUaR5gN6ROcbM4tHpTt83A\nabod1n3zg3yUHoEqxcOzLzE8DW7SMayOHobMY1rlNzcRAq8bKGUQFm8U/+zGFDkI\nQiitE8hnpoceCQtr81D7Wjj6om71Z/37wJ69ZXMUp39DKNf8GEt3za7uQmZRqBP8\nDaAclvpQmXev915VeZdnWw==\n-----END PRIVATE KEY-----\n",
      Dialogflow_V2.LANG_ENGLISH_US,
      'newagent-unjfcl'
    );


  }


  handleSpeech() {

    Voice.start('en-US')
    Dialogflow_V2.onListeningStarted((response) => {
      console.log(response, "listening started");


    });

    Dialogflow_V2.finishListening(() => {
      console.log('finish listing');

    })

    Dialogflow_V2.onListeningCanceled(() => {
      console.log("listening canceled");
    });

    Dialogflow_V2.onListeningFinished((res) => {
      console.log(res, "listening finished");
      this.setState({
        type: 'Mic'
      })
    });

    Dialogflow_V2.onAudioLevel(level => {
      console.log(level);
    });


    Dialogflow_V2.startListening(result => {
      console.log(result);
    }, error => {
      console.log(error);
    });

    Voice.onSpeechResults = (res) => {
      let speech = res.value[0]

      this.onSendVoice(speech)


    }
    Voice.onSpeechPartialResults = (event) => {

      this.setState({
        text: event.value[0]
      })
    }


  }



  renderComposer = props => {
    return (
      <View style={{ flexDirection: 'row', }}>
        <Composer {...props} />
      </View>
    );
  }

  send(messages) {
    return (<View style={{ flexDirection: 'row', width: '20%', justifyContent: 'space-around', alignSelf: 'center' }}>
      <TouchableOpacity onPress={() => { this.onSendVoice(messages.text) }} style={styles.mic}><Text>
        <Icon name="paper-plane" size={20} color="grey" />
      </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => { this.handleSpeech() }} style={styles.mic}><Text>
        <Icon name="microphone" size={20} color="grey" />
      </Text>
      </TouchableOpacity>
    </View>
    )
  }

  onSendVoice(speech) {
    let obj = [
      {
        text: speech, user: { _id: 1, name: "Sagar", avatar: "https://randomuser.me/api/portraits/women/57.jpg" },
        createdAt: moment().format('LLLL'), _id: moment().format('LTS')
      }
    ]

    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, obj),
      text: ''
    }))
    obj.forEach(message => {
      console.log(message.text);
      Dialogflow_V2.requestQuery(
        message.text,
        result => {
          messages = [
            {
              _id: result.responseId,
              text: result.queryResult.fulfillmentText,
              createdAt: new Date(),
              user: {
                _id: 2,
                name: "Vainilla",
                avatar: "https://randomuser.me/api/portraits/women/57.jpg"
              }
            }
          ]
          this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, messages),

          }))

          this.state.type == 'Mic' ? Tts.speak(result.queryResult.fulfillmentText) : undefined
          this.setState({
            type: 'text'
          })
        },
        error => console.log(error)
      );
    });
  }


  render() {
    console.disableYellowBox = true
    return <GiftedChat

      messages={this.state.messages}
      renderSend={messages => this.send(messages)}
      placeholder="Enter Message..."
      user={{
        _id: 1,
      }}
      text={this.state.text}
      renderUsernameOnMessage={true}
      onInputTextChanged={(e) => { this.setState({ text: e }) }}

    />
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  mic: {}
});
