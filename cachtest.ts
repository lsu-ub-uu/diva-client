let test = 'initial';

const getTest = () => test;
const setTest = (v: string) => (test = v);

const cache = { getTest, setTest };
export default cache;
