package com.actoviq.survey.service;

import com.actoviq.survey.model.GenerateSurveyRequest;
import com.actoviq.survey.model.QuestionType;
import com.actoviq.survey.model.SurveyDraft;
import com.actoviq.survey.model.SurveyQuestion;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.Locale;

@Service
public class SurveyDraftService {
    public SurveyDraft generateDraft(GenerateSurveyRequest request) {
        String normalizedGoal = request.goal().trim();
        String title = buildTitle(normalizedGoal);

        return new SurveyDraft(
                "draft-" + Instant.now().toEpochMilli(),
                title,
                request.audience().trim(),
                normalizedGoal,
                request.tone().trim(),
                4,
                List.of(
                        new SurveyQuestion(
                                "q1",
                                QuestionType.RATING,
                                "How well does this experience help you achieve: " + normalizedGoal + "?",
                                true,
                                List.of()
                        ),
                        new SurveyQuestion(
                                "q2",
                                QuestionType.SINGLE_CHOICE,
                                "Which part of the experience matters most to you right now?",
                                true,
                                List.of("Speed", "Ease of use", "Quality of insights", "Team collaboration")
                        ),
                        new SurveyQuestion(
                                "q3",
                                QuestionType.MULTI_CHOICE,
                                "What should we improve next for " + request.audience().trim() + "?",
                                false,
                                List.of("Setup", "Question quality", "Reporting", "Integrations", "Guidance")
                        ),
                        new SurveyQuestion(
                                "q4",
                                QuestionType.TEXT,
                                "What is one specific change that would make this more useful?",
                                false,
                                List.of()
                        )
                )
        );
    }

    private String buildTitle(String goal) {
        String compactGoal = goal.length() > 46 ? goal.substring(0, 46).trim() : goal;
        if (compactGoal.isBlank()) {
            return "AI Survey Draft";
        }

        return compactGoal.substring(0, 1).toUpperCase(Locale.ROOT) + compactGoal.substring(1) + " Survey";
    }
}
