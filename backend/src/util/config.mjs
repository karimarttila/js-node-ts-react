const STAGE = process.env.STAGE || 'dev';

const production = () => STAGE === 'prod';
// Testing
// const production = () => true;

export { STAGE, production };
