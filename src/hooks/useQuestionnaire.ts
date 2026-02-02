"use client";

import { useReducer, useCallback } from "react";
import {
  QuestionnaireResponses,
  Case,
  createEmptyQuestionnaireResponses,
} from "@/lib/schemas/case";
import {
  QUESTIONS,
  TOTAL_QUESTIONS,
  getQuestionByIndex,
  isQuestionAnswered,
} from "@/lib/schemas/questionnaire";

interface QuestionnaireState {
  responses: QuestionnaireResponses;
  currentIndex: number;
  isSubmitting: boolean;
  error: string | null;
  direction: "forward" | "backward";
}

type QuestionnaireAction =
  | { type: "SET_RESPONSE"; field: keyof QuestionnaireResponses; value: unknown }
  | { type: "NEXT_QUESTION" }
  | { type: "PREV_QUESTION" }
  | { type: "GO_TO_QUESTION"; index: number }
  | { type: "SET_SUBMITTING"; isSubmitting: boolean }
  | { type: "SET_ERROR"; error: string | null }
  | { type: "LOAD_CASE"; caseData: Case };

function questionnaireReducer(
  state: QuestionnaireState,
  action: QuestionnaireAction
): QuestionnaireState {
  switch (action.type) {
    case "SET_RESPONSE":
      return {
        ...state,
        responses: {
          ...state.responses,
          [action.field]: action.value,
        },
        error: null,
      };

    case "NEXT_QUESTION":
      if (state.currentIndex >= TOTAL_QUESTIONS - 1) {
        return state;
      }
      return {
        ...state,
        currentIndex: state.currentIndex + 1,
        direction: "forward",
        error: null,
      };

    case "PREV_QUESTION":
      if (state.currentIndex <= 0) {
        return state;
      }
      return {
        ...state,
        currentIndex: state.currentIndex - 1,
        direction: "backward",
        error: null,
      };

    case "GO_TO_QUESTION":
      return {
        ...state,
        currentIndex: Math.max(0, Math.min(action.index, TOTAL_QUESTIONS - 1)),
        direction: action.index > state.currentIndex ? "forward" : "backward",
        error: null,
      };

    case "SET_SUBMITTING":
      return {
        ...state,
        isSubmitting: action.isSubmitting,
      };

    case "SET_ERROR":
      return {
        ...state,
        error: action.error,
      };

    case "LOAD_CASE":
      return {
        ...state,
        responses: action.caseData.questionnaireResponses,
        currentIndex: action.caseData.currentQuestionIndex,
      };

    default:
      return state;
  }
}

function createInitialState(): QuestionnaireState {
  return {
    responses: createEmptyQuestionnaireResponses(),
    currentIndex: 0,
    isSubmitting: false,
    error: null,
    direction: "forward",
  };
}

export function useQuestionnaire() {
  const [state, dispatch] = useReducer(
    questionnaireReducer,
    null,
    createInitialState
  );

  const setResponse = useCallback(
    (field: keyof QuestionnaireResponses, value: unknown) => {
      dispatch({ type: "SET_RESPONSE", field, value });
    },
    []
  );

  const validateCurrentQuestion = useCallback((): boolean => {
    const question = getQuestionByIndex(state.currentIndex);
    if (!question) return false;

    return isQuestionAnswered(question, state.responses);
  }, [state.currentIndex, state.responses]);

  const goNext = useCallback(() => {
    const question = getQuestionByIndex(state.currentIndex);
    if (!question) return false;

    if (!isQuestionAnswered(question, state.responses)) {
      dispatch({ type: "SET_ERROR", error: "Please answer this question to continue" });
      return false;
    }

    dispatch({ type: "NEXT_QUESTION" });
    return true;
  }, [state.currentIndex, state.responses]);

  const goPrev = useCallback(() => {
    dispatch({ type: "PREV_QUESTION" });
  }, []);

  const goToQuestion = useCallback((index: number) => {
    dispatch({ type: "GO_TO_QUESTION", index });
  }, []);

  const setSubmitting = useCallback((isSubmitting: boolean) => {
    dispatch({ type: "SET_SUBMITTING", isSubmitting });
  }, []);

  const setError = useCallback((error: string | null) => {
    dispatch({ type: "SET_ERROR", error });
  }, []);

  const loadCase = useCallback((caseData: Case) => {
    dispatch({ type: "LOAD_CASE", caseData });
  }, []);

  const currentQuestion = getQuestionByIndex(state.currentIndex);
  const isFirstQuestion = state.currentIndex === 0;
  const isLastQuestion = state.currentIndex === TOTAL_QUESTIONS - 1;
  const progress = ((state.currentIndex + 1) / TOTAL_QUESTIONS) * 100;

  return {
    // State
    responses: state.responses,
    currentIndex: state.currentIndex,
    isSubmitting: state.isSubmitting,
    error: state.error,
    direction: state.direction,

    // Computed
    currentQuestion,
    isFirstQuestion,
    isLastQuestion,
    progress,
    totalQuestions: TOTAL_QUESTIONS,
    questions: QUESTIONS,

    // Actions
    setResponse,
    goNext,
    goPrev,
    goToQuestion,
    setSubmitting,
    setError,
    loadCase,
    validateCurrentQuestion,
  };
}

export type UseQuestionnaireReturn = ReturnType<typeof useQuestionnaire>;
