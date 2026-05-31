package com.actoviq.survey.controller;

import com.actoviq.survey.model.AnalyticsSnapshot;
import com.actoviq.survey.model.SurveyDraft;
import com.actoviq.survey.service.SurveyQueryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/surveys")
public class SurveyController {
    private final SurveyQueryService surveyQueryService;

    public SurveyController(SurveyQueryService surveyQueryService) {
        this.surveyQueryService = surveyQueryService;
    }

    @GetMapping
    public List<SurveyDraft> listSurveys() {
        return surveyQueryService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<SurveyDraft> getSurvey(@PathVariable String id) {
        return surveyQueryService.findById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/{id}/analytics")
    public AnalyticsSnapshot getAnalytics(@PathVariable String id) {
        return surveyQueryService.analyticsFor(id);
    }
}
