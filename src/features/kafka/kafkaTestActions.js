import { KAFKA_TEST_REQUEST } from 'src/store/actionTypes';


export const kafkaTestRequest = (param) => ({
  type: KAFKA_TEST_REQUEST,
   payload: param
});

