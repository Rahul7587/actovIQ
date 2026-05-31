package com.actoviq.survey.model;

import java.util.List;

public record SurveyQuestion(
        String id,
        QuestionType type,
        String prompt,
        boolean required,
        List<String> options
) {
}
