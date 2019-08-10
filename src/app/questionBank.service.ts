import { Helper } from './common.helper';
import { QuestionModel } from './questionModel.component';

export class QuestionBankService {
  totalNumberOfQuestions: number;
  questions: QuestionModel[];

  constructor() {
    this.questions = [
      {
        id: 1,
        question: 'What does SLPR stand for?',
        answer: 'Slow, Look, Press, Roll',
        options: [
          'Slow, Look, Press, Roll',
          'Slow, Lean, Power, Ride',
          'See, Lean, Push, Race'
        ],
        explanation: ''
      },
      {
        id: 2,
        question: 'What is your favorite bike?',
        answer: 'Kawasaki',
        options: ['Kawasaki', 'Yamaha', 'Honda'],
        explanation: ''
      }
    ];

    this.totalNumberOfQuestions = this.questions.length;
  }

  getNextQuestion(excludeMask: number[]): QuestionModel {
    let nextQuestionId = Helper.getRandomIntFromInterval(1, this.totalNumberOfQuestions);

    while (excludeMask.includes(nextQuestionId)) {
      nextQuestionId = Helper.getRandomIntFromInterval(1, this.totalNumberOfQuestions);
    }

    return this.getQuestionById(nextQuestionId);
  }

  getQuestionById(questionId: number): QuestionModel {
    // TODO: Remove
    const correctedQuestionId = questionId % this.totalNumberOfQuestions;
    return this.questions[correctedQuestionId];
  }
}