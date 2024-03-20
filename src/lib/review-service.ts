export class ReviewService {
  // The queue of words left to review
  private _queue: number[];
  // The remaining number of times to review a word
  private _remainingReviews: number[];
  private _totalNumWords: number;
  constructor(numWords: number, frequency: number) {
    this._queue = Array.from({ length: numWords }, (_, index) => index);
    this._remainingReviews = Array.from({ length: numWords }, () => frequency);
    this._totalNumWords = numWords * frequency;
  }

  getNextWordToReview(): number | null {
    // Assuming removeFirst() is analogous to shifting the first element off the queue
    const index = this._queue.shift();

    if (index !== undefined && index !== null) {
      return index;
    }
    return null; // Using || null to ensure null is returned instead of undefined
  }

  updateQueue(wordIndex: number, isCorrect: boolean): void {
    if (isCorrect) {
      this._remainingReviews[wordIndex]--;
      if (this._remainingReviews[wordIndex] > 0) {
        // Assuming addLast() is analogous to pushing to the end of the queue
        this._queue.push(wordIndex);
      }
    } else {
      // Assuming addFirst() is analogous to unshifting to the start of the queue
      this._queue.unshift(wordIndex);
    }
  }

  isReviewComplete(): boolean {
    return (
      this._queue.length === 0 &&
      this._remainingReviews.every((element) => element === 0)
    );
  }

  numberOfWordsReviewed(): number {
    return (
      this._totalNumWords -
      this._remainingReviews.reduce((agg, element) => agg + element, 0)
    );
  }
}
