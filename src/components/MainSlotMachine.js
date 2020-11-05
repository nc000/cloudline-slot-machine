import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { addToWins, addToTries, resetTally } from '../actions/tallyActions';
import Tries from './Tries';
import Wins from './Wins';
import { selectRandomElement } from '../utils/helperFunctions';

const Parent = styled.div`
  height: 100%;
  width: 100%;
  background: #dcdcf3;
  display: flex;
  align-items: center;
  justify-content: space-around;

  @media (max-width: 800px) {
    flex-direction: column;
  }
`;

const SubDiv = styled.div`
  height: 80%;
  width: 40%;
  margin: 20px;
  padding: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  background: #e09e9e;

  @media (max-width: 800px) {
    width: 90%;
  }
`;

const Header = styled.div`
  height: 60px;
  width: 100%;
  background: #cc6d6d;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 26px;
  color: white;
`;

const Slots = styled.div`
  display: flex;
  justify-content: space-between;
  width: 90%;
  height: 60%;
`;

const Slot = styled.div`
  height: 100%;
  width: 33%;
  border: 2px solid black;
`;

const Spin = styled.button`
  width: 300px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 25px;
  font-weight: bold;
  margin-top: 10px;
  background: green;
  color: white;
  user-select: none;
  :hover {
    cursor: pointer;
  }
  @media (max-width: 950px) {
    width: 90%;
  }

  @media (max-height: 600px) {
    height: 20%;
  }
`;

const Tally = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
  font-weight: bold;
  color: black;
  width: 100%;
  font-size: 40px;
  @media (max-width: 950px) {
    font-size: 25px;
  }
`;

const MainSlotMachine = () => {
  // The dispatch function for dispatching actions when we
  // call our action creators.
  const dispatch = useDispatch();

  // Getting our main tally data from redux state.
  const tally = useSelector((state) => state.tally);

  // A few random base colors. To worsen the odds of winning,
  // you can add more colors.
  const baseColors = ['red', 'blue', 'yellow'];

  // By default, the slot machine colors are all grey. You can change
  // this if you want.
  const [newColors, setColors] = useState(['grey', 'grey', 'grey']);

  // Track whether the spin button is disabled or not
  const [spinIsDisabled, setSpinIsDisabled] = useState(false);

  // TASK
  // Here is the main spin function which should be called
  // every time we press the Spin button. This function should:

  // 1. Add to our tally tries in the redux state. (i.e dispatch(addToTries()))

  // 2. Randomly select a color 3 times from our base colors, and
  // set them in our local state above, newColors.

  // 3. If all the colors are the same, we add to our tally wins.
  function spin() {
    dispatch(addToTries());

    // setColors with three random base colours
    const colors = [
      selectRandomElement(baseColors),
      selectRandomElement(baseColors),
      selectRandomElement(baseColors),
    ];

    setColors(colors);

    // If all colours are the same, increase the win count
    if (colors.every((color) => color === colors[0])) {
      dispatch(addToWins());
    }
  }

  // TASK
  // In this lifecycle function, of the tally wins reaches 5,
  // have a window.confirm message come up telling the user to 'Stop Gambling!'.
  // on 5 wins the spin button should also become disabled.
  // On selecting 'ok', the tally wins and tries are reset.
  useEffect(() => {
    if (tally.wins === 5) {
      setSpinIsDisabled(true);

      if (window.confirm('Stop Gambling!')) {
      } else {
        setSpinIsDisabled(false);
      }

      dispatch(resetTally());
    }
  }, [tally.wins, dispatch]);

  // TASK
  // Within the Slots div, create 3 slots. (Create a styled component called 'Slot'
  // and render it out 3 times). Their background colors should be those stored
  // in the newColors array. (Use inline styling)

  return (
    <Parent>
      <SubDiv>
        <Slots>
          <Slot
            style={{
              backgroundColor: newColors[0],
            }}
          />
          <Slot
            style={{
              backgroundColor: newColors[1],
            }}
          />
          <Slot
            style={{
              backgroundColor: newColors[2],
            }}
          />
        </Slots>

        <Spin
          onClick={() => {
            if (!spinIsDisabled) {
              spin();
            }
          }}
        >
          Spin!
        </Spin>
      </SubDiv>
      <SubDiv>
        <Header>Tally</Header>
        <Tally>
          <Tries />
          <Wins />
        </Tally>
      </SubDiv>
    </Parent>
  );
};

export default MainSlotMachine;
