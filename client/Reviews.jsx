import React from 'react';
import msgIcon from './message-icon.png';

const moment = require('moment');

const date = new Date();
const checkDate = date.setDate(date.getDate() - 30);

const Reviews = ({ reviews }) => {
  const list = reviews.map((review) => (
    <div key={review._id} className="review">
      <div className="review-user">
        <div className="user-box">
          <div className="user-circle" style={{ background: review.color }}>
            <div className="user-initials">
              {review.firstName ? review.firstName[0] : 'O'}
              {review.firstName ? review.lastName[0] : 'T'}
            </div>
          </div>
        </div>
        <div className="user-name">
          {review.firstName ? review.firstName : 'OpenTable'}
          {review.firstName ? review.lastName.substring(0, 1) : '\nDiner'}
          {review.vip ? <span className="user-vip">VIP</span> : ''}
        </div>
        <div className="user-city">
          {review.city}
        </div>
        <div className="user-num-reviews">
          <img className="msg-icon" src={msgIcon} alt="icon" />
          {review.numReviews}
          {' '}
          {review.numReviews > 1 ? 'reviews' : 'review'}
        </div>
      </div>
      <div className="review-details">
        <div className="review-header">
          <div className="review-pre-ratings">
            <div className="review-stars">
              <span style={{ color: (review.overall >= 1) ? 'rgb(218, 55, 67)' : '#d8d9db' }}>★</span>
              <span style={{ color: (review.overall >= 2) ? 'rgb(218, 55, 67)' : '#d8d9db' }}>★</span>
              <span style={{ color: (review.overall >= 3) ? 'rgb(218, 55, 67)' : '#d8d9db' }}>★</span>
              <span style={{ color: (review.overall >= 4) ? 'rgb(218, 55, 67)' : '#d8d9db' }}>★</span>
              <span style={{ color: (review.overall >= 5) ? 'rgb(218, 55, 67)' : '#d8d9db' }}>★</span>
            </div>
            {' '}
            <span className="review-date">
              • Dined
              {' '}
              {((moment(checkDate).format('YYYY-MM-DD')) > (moment(review.dineDate).format('YYYY-MM-DD'))) ? moment(review.dineDate).format('LL') : moment(review.dineDate).fromNow() }
            </span>
          </div>
          <div className="review-ratings">
            Overall
            {' '}
            <span className="review-numbers">
              {review.overall}
            </span>
            {' '}
            • Food
            {' '}
            <span className="review-numbers">{review.food}</span>
            {' '}
            • Service
            {' '}
            <span className="review-numbers">{review.service}</span>
            {' '}
            • Ambience
            {' '}
            <span className="review-numbers">{review.ambience}</span>
          </div>
        </div>
        <div className="review-comments">
          {review.comments}
        </div>
      </div>
    </div>
  ));
  return <div>{list}</div>;
};
export default Reviews;
