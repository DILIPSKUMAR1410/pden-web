import React, { Component, useEffect } from "react";
import useScript from "./useScript";
import {
  first,
  second,
  third,
  fourth,
  fifth,
  sixth,
  seventh,
  eighth,
} from "../../Assets/Images/landing_images";
import { slack, twitter, telegram } from "../../Assets/Images/landing_images";
import "./Landing.css";

function GetStartedItem({ text, image, alt }) {
  const textComponent = (
    <div className="getting-started__text">
      <h3 className="getting-started__title">{text.title}</h3>
      <p className="getting-started__content">{text.content}</p>
    </div>
  );
  const imageComponent = (
    <img src={image} className="getting-started__image"></img>
  );
  if (alt) {
    return (
      <div className="getting-started__item getting-started__item--alt">
        {imageComponent}
        {textComponent}
      </div>
    );
  } else {
    return (
      <div className="getting-started__item getting-started__item--org">
        {textComponent}
        {imageComponent}
      </div>
    );
  }
}

function Hero(props) {
  useScript();
  return (
    <div class="hero-container">
      <canvas id="btrn1"></canvas>
      <div className="topbar">
        <span className="topbar__logo">pden</span>
        <a
          href="https://play.google.com/store/apps/details?id=com.dk.pden"
          className="topbar__btn"
        >
          Download App(Beta)
        </a>
      </div>
      <div className="hero__text">
        <h2 className="hero__title">Be your better self</h2>
        <div className="hero__content">
          Pden, pronounced Pen, is a decentralized social networking app where
          you can share your thoughts, explore thoughts of interesting people
          and interact with like minded people in an environment free from
          social media noise. Pden helps you be your better self while
          interacting with others online. We are bringing mindfulness and
          civility in online conversations by creating a space to facilitate
          responses rather than evoking reactions.
        </div>
      </div>
    </div>
  );
}

function GetStarted(props) {
  const texts = [
    {
      title: "Book",
      content:
        "Your profile is your Book. Borrow books and you'll start getting 'Thoughts' of other users in your feed. A public short-form diary which you share with the world.-",
    },
    {
      title: "Shelf",
      content:
        "List of books you have borrowed. We don't show the number of books you have borrowed. You have to browse through your shelf to see what books you have borrowed.",
    },

    {
      title: "Thoughts",
      content:
        "Post thoughts you want to share with the world. It could be anything, your status, an update, an expression or some random musing.",
    },
    {
      title: "Spread",
      content:
        "Forward 'Thoughts' you feel worth spreading to people who follow you. The number of Spread count and Users that spread the Thought are not revealed.",
    },
    {
      title: "Ownership of data and identity",
      content:
        "You own your data and identity. Your Thoughts and Social Graph are stored in a decentralized storage system that you own. The day you stop loving us you can take your data and identity and move on. ",
    },
    {
      title: "Non algorithmic / Transparent",
      content:
        "Your feed is in plain and simple chronological order. Exactly the way it happened. No algorithms to decide what is good and bad for you.",
    },
    {
      title: "Discussion v0.1",
      content:
        "To help facilitate mindful conversations around your Thoughts. It cannot be shared out of context to avoid misinterpretation.",
    },
    {
      title: "No vanity metrics",

      content:
        "No follower counts, no retweets/share counts, no false reputation metrics. Whom we follow and what we share/like/retweet has become a derivative of how many people are liking that. Not showing counts would help users focus more on the content than the numbers around that.",
    },
  ];
  const images = [first, second, third, fourth, fifth, sixth, seventh, eighth];
  return (
    <div className="getting-started">
      <h2 className="section__title">TO GET STARTED</h2>
      {texts.map((text, index) => {
        return (
          <GetStartedItem
            text={text}
            image={images[index]}
            alt={index % 2 === 1}
          />
        );
      })}
      <div className="yt-video"> YT VIDEO COMES HERE</div>
      <div className="getting-started__list">
        <p className="getting-started__li bold">
          Pden is powered by <a href="https://blockstack.org">Blockstack's</a>{" "}
          open source software and you'll require a Blockstack id to sign in to
          Pden.
        </p>
        <p className="getting-started__li">
          Here are some instructions to help you in case you get stuck:
        </p>
        <p className="getting-started__li">1. Download and install Pden app</p>
        <p className="getting-started__li">
          2. Click 'sign in' with Blockstack.
        </p>
        <p className="getting-started__li">
          3. Open with your default web browser. Sign in if you have Blockstack
          id, else, select 'Create new ID' and setup your blockstack account.
        </p>
        <p className="getting-started__li">
          4. Sign in to Pden with your Blockstack ID and make your first post.
        </p>
      </div>
    </div>
  );
}

function Footer(props) {
  return (
    <div className="footer">
      Join the Conversation
      <div className="footer__social">
        <a
          href="https://https://join.slack.com/t/pden-group/shared_invite/enQtNDg5MjczOTQwOTMwLTlkYWFiOTMxMTdjMjZjMDZiNTk5MzAzZjJhNTU2ZmFlOTlhNTJkZWEyZjY4Y2Q5MmJkN2QwNWYyNjBmZTMzNjg"
          className="social__link"
        >
          <img src={slack} alt="" className="social__icon" />
        </a>
        <a href="https://https://twitter.com/pden_app" className="social__link">
          <img src={twitter} alt="" className="social__icon" />
        </a>
        <a
          href="https://https://t.me/joinchat/AAAAAEVxXmM9ufAoSTDM7Q"
          className="social__link"
        >
          <img src={telegram} alt="" className="social__icon" />
        </a>
      </div>
    </div>
  );
}

export default class Landing extends Component {
  render() {
    return (
      <div className="landing">
        <Hero />
        <GetStarted />
        <Footer />
      </div>
    );
  }
}
