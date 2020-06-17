import React from 'react';
import Button from '@material-ui/core/Button';
import CountUp from 'react-countup';
import Box from '@material-ui/core/Box';
import makeStyles from '@material-ui/core/styles/makeStyles';

// function to convert a number to a string based on the given alphabet
//    example: if alphabet is 'abc',
//      0 -> 'a'
//      1 -> 'b'
//      2 -> 'c'
//      3 -> 'aa'
//      4 -> 'ab'
//      5 -> 'ac'
//      6 -> 'ba'
//      ...
function toLetters(num, alphabet) {
  const mod = num % alphabet.length;
  const pow = Math.floor(num / alphabet.length);
  const out = alphabet[mod];
  return pow ? toLetters(pow, alphabet) + out : out;
}

// function to convert a string to a number based on the given alphabet
// see example for toLetters
function fromLetters(str, alphabet) {
  var out = 0, len = str.length, pos = len;
  while (--pos > -1) {
      out += (alphabet.indexOf(str[pos])) * Math.pow(alphabet.length, len - 1 - pos);
  }
  return out;
}

const useStyles = makeStyles({
  counter: {
    fontSize: '2em',
    fontFamily: 'Monospace',
    letterSpacing: 6
  },
  start: {
    height: '2em',
    fontSize: '.6em',
    fontWeight: 400,
    marginTop: 10
  },
  text: {
    textAlign: 'center'
  }
});

const alpha_lower = 'aeiou';
const alpha_mixed = 'aeiouAEIOU';

export default function PasswordGuesser(props) {
  const classes = useStyles();

  const passwordGuesser = (
    (props.usesInput !== true) ? null :
    (props.inputType === 'num') ? (
      <Box className={classes.counter}>
        <CountUp
          start={0}
          duration={parseInt(props.userInput, 10) / 10000}
          end={parseInt(props.userInput, 10)}
          formattingFn={num => String(num).padStart(props.inputLength, '0')}
          useEasing={false}
        >
          {({ countUpRef, start }) => (
            <Box display='flex' flexDirection='column' justifyContent='center' alignItems='center'>
              <span ref={countUpRef}/>
              <Button disableRipple onClick={start} variant='outlined' className={classes.start}>
                Start
              </Button>
            </Box>
          )}
        </CountUp>
      </Box>) : 
    (props.inputType === 'alpha') ? (
      <Box className={classes.counter}>
        <CountUp
          start={0}
          duration={fromLetters(props.userInput, alpha_lower) / 10000}
          end={fromLetters(props.userInput, alpha_lower)}
          formattingFn={num => toLetters(num, alpha_lower).padStart(props.inputLength, alpha_lower[0])}
          useEasing={false}
        >
          {({ countUpRef, start }) => (
            <Box display='flex' flexDirection='column' justifyContent='center' alignItems='center'>
              <span ref={countUpRef} />
              <Button disableRipple onClick={start} variant='outlined' className={classes.start}>
                Start
              </Button>
            </Box>
          )}
        </CountUp>
      </Box>
    ) : 
    (props.inputType === 'Alpha') ? (
      <Box className={classes.counter}>
        <CountUp
          start={0}
          duration={fromLetters(props.userInput, alpha_mixed) / 10000}
          end={fromLetters(props.userInput, alpha_mixed)}
          formattingFn={num => toLetters(num, alpha_mixed).padStart(props.inputLength, alpha_mixed[0])}
          useEasing={false}
        >
          {({ countUpRef, start }) => (
            <Box display='flex' flexDirection='column' justifyContent='center' alignItems='center'>
              <span ref={countUpRef} />
              <Button disableRipple onClick={start} variant='outlined' className={classes.start}>
                Start
              </Button>
            </Box>
          )}
        </CountUp>
      </Box>
    ) : null
  );

  return passwordGuesser;
}