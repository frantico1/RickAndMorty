import {
  View,
  Text,
  TouchableWithoutFeedback,
  StyleSheet,
  Dimensions,
} from 'react-native';
import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';

const ChangeDataButton = ({name, onPress}) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.button}>
        <Text style={styles.buttonText}>{name}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

const Pagination = props => {
  const {currentPage} = useSelector(state => state.data);

  return (
    <View style={styles.container}>
      <View>
        {/* <Text style={styles.text}>Sezon Sayısı: {props?.count || '-'}</Text> */}
      </View>

      <View style={styles.buttonContainer}>
        <ChangeDataButton name="Prev" onPress={props.prev} />
        <View style={styles.currentPageContainer}>
          <Text style={styles.text}>Page:</Text>
          <Text style={styles.textItem}>
            {props.pageCurrent ? props.pageCurrent : currentPage} / {props.page}
          </Text>
        </View>
        <ChangeDataButton name="Next" onPress={props.next} />
      </View>
    </View>
  );
};

export default Pagination;

const H = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: 'black',
  },
  text: {
    color: 'white',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: H * 0.01,
    borderBottomWidth: 1,
    borderBottomColor: 'white',
  },
  button: {
    backgroundColor: 'gray',
    padding: H * 0.01,
    borderRadius: 10,
  },
  buttonText: {
    color: 'orange',
  },
  textItem: {
    color: 'orange',
  },
  currentPageContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: H * 0.01,
    padding: H * 0.01,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
