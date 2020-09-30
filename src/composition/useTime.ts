import { ref } from 'vue';

const time = ref(new Date());

export default () => {
  return {
    time,
  };
};
