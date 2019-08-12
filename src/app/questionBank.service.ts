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
        explanation: '',
        usersAnswer: ''
      },
      {
        id: 2,
        question: 'What is your favorite bike?',
        answer: 'Kawasaki',
        options: [
          'Kawasaki',
          'Yamaha',
          'Honda'
        ],
        explanation: '',
        usersAnswer: ''
      }
      ,
      {
        id: 3,
        question: 'What is your most important role in reducing risk?',
        answer: 'Time + Space + SEE',
        options: [
          'Time + Space + SEE',
          'Dont ride a bike.',
          'Buy insurance.'
        ],
        explanation: '',
        usersAnswer: ''
      },
      {
        id: 4,
        question: 'What is the friction zone?',
        answer: 'Some zone',
        options: [
          'Some zone',
          'Dont know',
          'Ice cream'
        ],
        explanation: '',
        usersAnswer: ''
      },
      {
        id: 5,
        question: 'What are escape routes?',
        answer: 'Routes for escaping',
        options: [
          'Routes for escaping',
          'A movie',
          'Ice cream'
        ],
        explanation: '',
        usersAnswer: ''
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