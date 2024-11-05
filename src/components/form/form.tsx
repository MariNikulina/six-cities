import {useState, ChangeEvent, Fragment, FormEvent, useEffect} from 'react';
import {Rating, STARS_COUNT} from '../../const';
import {NewReview} from '../../types/review';
import './form.css';

type FormProps = {
  onSubmit: (formData: NewReview) => void;
}

function Form ({onSubmit}: FormProps): JSX.Element {
  const [text, setText] = useState<string>('');
  const [ratingOffer, setRatingOffer] = useState<number>(0);
  const [isValid, setIsValid] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  useEffect(() => {

    if (text.length > 2 && ratingOffer !== 0) {
      setIsValid(true);
      return;
    }
    setIsValid(false);
  }, [text, ratingOffer]);

  const handleTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRatingOffer(Number(e.target.value));
  };

  return (
    <form
      className="reviews__form form"
      action="#"
      method="post"
      onSubmit={(e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsDisabled(true);
        onSubmit({
          comment: text,
          rating: ratingOffer,
        });
        setText('');
        setRatingOffer(0);
        setIsDisabled(false);
      }}
    >
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">

        {Object.entries(Rating).map(([_, rating], i)=>
          (
            <Fragment key = {rating}>
              <input
                className="form__rating-input visually-hidden"
                name="rating"
                value={STARS_COUNT - i}
                checked={STARS_COUNT - i === ratingOffer}
                onChange={handleInputChange}
                id={`${STARS_COUNT - i}-stars`}
                type="radio"
                disabled={isDisabled}
              />
              <label htmlFor={`${STARS_COUNT - i}-stars`} className="reviews__rating-label form__rating-label" title={rating}>
                <svg className="form__star-image" width="37" height="33">
                  <use xlinkHref="#icon-star"></use>
                </svg>
              </label>
            </Fragment>
          )
        )}

      </div>
      <textarea className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={text}
        onChange={(e) => handleTextareaChange(e)}
        minLength={2}
        maxLength={300}
        disabled={isDisabled}
      >
      </textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and
          describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className={`reviews__submit form__submit button ${isValid && !isDisabled ? 'form__submit_disabled-false' : 'form__submit_disabled-true'}`}
          type="submit"
          disabled={!isValid}
        >Submit
        </button>
      </div>
    </form>
  );
}

export default Form;
