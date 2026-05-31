package com.actoviq.survey.model;

import jakarta.validation.constraints.NotBlank;

public record GenerateSurveyRequest(
        @NotBlank String goal,
        @NotBlank String audience,
        @NotBlank String tone
) {
}
