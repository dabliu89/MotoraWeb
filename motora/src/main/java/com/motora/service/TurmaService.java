package com.motora.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.motora.entity.Aluno;
import com.motora.entity.Turma;
import com.motora.repository.TurmaRepository;

@Service
public class TurmaService {
    @Autowired
    private TurmaRepository turmaRepository;

    public Turma createTurma(Turma turma) {
        return turmaRepository.save(turma);
    }

    public List<Aluno> getAllTurmas() {
        return turmaRepository.findAll();
    }

    public Aluno getTurmaById(Long id) {
        return turmaRepository.findById(id).orElse(null);
    }

    public void deleteTurma(Long id) {
        turmaRepository.deleteById(id);
    }

}
