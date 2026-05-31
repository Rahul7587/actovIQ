package com.actoviq.survey.service;

import com.actoviq.survey.model.AnalyticsSnapshot;
import com.actoviq.survey.model.QuestionType;
import com.actoviq.survey.model.SurveyDraft;
import com.actoviq.survey.model.SurveyQuestion;
import com.actoviq.survey.model.ThemeShare;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SurveyQueryService {
    private final List<SurveyDraft> surveys = List.of(
            new SurveyDraft(
                    "survey-product-feedback",
                    "Product Experience Pulse",
                    "Active SaaS customers",
                    "Understand onboarding friction, core feature value, and expansion intent.",
                    "Clear, respectful, concise",
                    4,
                    List.of(
                            new SurveyQuestion("q1", QuestionType.RATING, "How easy was it to get value during your first week?", true, List.of()),
                            new SurveyQuestion("q2", QuestionType.SINGLE_CHOICE, "Which part of the product feels most valuable right now?", true, List.of("AI survey creation", "Response collection", "Analytics", "Team collaboration")),
                            new SurveyQuestion("q3", QuestionType.MULTI_CHOICE, "Where should we improve next?", false, List.of("Templates", "Question recommendations", "Dashboards", "Exports", "Integrations")),
                            new SurveyQuestion("q4", QuestionType.TEXT, "What is one change that would make this more useful for your team?", false, List.of())
                    )
            )
    );

    public List<SurveyDraft> findAll() {
        return surveys;
    }

    public Optional<SurveyDraft> findById(String id) {
        return surveys.stream().filter(survey -> survey.id().equals(id)).findFirst();
    }

    public AnalyticsSnapshot analyticsFor(String surveyId) {
        return new AnalyticsSnapshot(
                1248,
                78.4,
                8.2,
                List.of(
                        new ThemeShare("Onboarding clarity", 38),
                        new ThemeShare("Better reporting", 27),
                        new ThemeShare("More templates", 21),
                        new ThemeShare("Integrations", 14)
                )
        );
    }
}
