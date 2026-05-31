package com.actoviq.survey.controller;

import com.actoviq.survey.model.GenerateSurveyRequest;
import com.actoviq.survey.model.SurveyDraft;
import com.actoviq.survey.service.SurveyDraftService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/ai")
public class AiController {
    private final SurveyDraftService surveyDraftService;

    public AiController(SurveyDraftService surveyDraftService) {
        this.surveyDraftService = surveyDraftService;
    }

    @PostMapping("/survey-draft")
    public SurveyDraft generateSurveyDraft(@Valid @RequestBody GenerateSurveyRequest request) {
        return surveyDraftService.generateDraft(request);
    }
}
