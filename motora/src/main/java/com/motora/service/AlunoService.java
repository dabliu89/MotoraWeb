package com.motora.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.motora.entity.Aluno;
import com.motora.repository.AlunoRepository;
import com.motora.repository.TurmaRepository;

@Service
public class AlunoService {
    @Autowired
    private AlunoRepository alunoRepository;
    @Autowired
    private TurmaRepository turmaRepository;

    public Aluno registerAluno(Aluno aluno) {
        return alunoRepository.save(aluno);
    }

    public List<Aluno> getAllAlunos() {
        return alunoRepository.findAll();
    }

    public Aluno getAlunoById(Long id) {
        return alunoRepository.findById(id).orElse(null);
    }

    public void deleteAluno(Long id) {
        alunoRepository.deleteById(id);
    }

    public List<Aluno> getAlunosByTurma(Long turmaId) {
        return alunoRepository.findAll().stream()
                .filter(aluno -> aluno.getTurma().getId().equals(turmaId))
                .collect(Collectors.toList());
    }

    public void delete(Long id) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'delete'");
    }

    public ResponseEntity<Aluno> findById(Long id) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'findById'");
    }

    public List<Aluno> findAll() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'findAll'");
    }

    public Aluno save(Aluno aluno) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'save'");
    }
}
