package com.motora.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.motora.entity.Aluno;
import com.motora.entity.Feedback;
import com.motora.repository.AvaliacaoRepository;
import com.motora.repository.FeedbackRepository;

@Service
public class FeedbackService {
    @Autowired
    private FeedbackRepository feedbackRepository;
    @Autowired
    private AvaliacaoRepository avaliacaoRepository;

    public Aluno updateFeedback(Long id, Feedback feedback) {
        Aluno existingFeedback = feedbackRepository.findById(id).orElseThrow();
        existingFeedback.setTurma(feedback.getText());
        return feedbackRepository.save(existingFeedback);
    }

    public Aluno getFeedbackById(Long id) {
        return feedbackRepository.findById(id).orElse(null);
    }

    public void delete(Long id) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'delete'");
    }

    public List<Feedback> findAll() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'findAll'");
    }

    public Feedback save(Feedback feedback) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'save'");
    }
}
