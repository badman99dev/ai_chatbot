import {
  customProvider,
  extractReasoningMiddleware,
  wrapLanguageModel,
} from 'ai';
import { fireworks } from '@ai-sdk/fireworks'; // Fireworks import
import {
  artifactModel,
  chatModel,
  reasoningModel,
  titleModel,
} from './models.test';
import { isTestEnvironment } from '../constants';

export const myProvider = isTestEnvironment
  ? customProvider({
      languageModels: {
        'chat-model': chatModel,
        'chat-model-reasoning': reasoningModel,
        'title-model': titleModel,
        'artifact-model': artifactModel,
      },
    })
  : customProvider({
      languageModels: {
        'chat-model': fireworks('accounts/fireworks/models/qwen3-235b-a22b-instruct-2507'),
        'chat-model-reasoning': wrapLanguageModel({
          model: fireworks('accounts/fireworks/models/qwen3-235b-a22b-instruct-2507'),
          middleware: extractReasoningMiddleware({ tagName: 'think' }),
        }),
        'title-model': fireworks('accounts/fireworks/models/qwen3-235b-a22b-instruct-2507'),
        'artifact-model': fireworks('accounts/fireworks/models/qwen3-235b-a22b-instruct-2507'),
      },
      // Agar Fireworks AI image model support karta hai toh yahan use karo
      // imageModels: {
      //   'small-model': fireworks.imageModel('your-image-model-id'),
      // },
    });
