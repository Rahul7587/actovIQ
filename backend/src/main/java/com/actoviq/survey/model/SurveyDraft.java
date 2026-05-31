package com.actoviq.survey.model;

import java.util.List;

public record SurveyDraft(
        String id,
        String title,
        String audience,
        String goal,
        String tone,
        int estimatedMinutes,
        List<SurveyQuestion> questions
) {
}
