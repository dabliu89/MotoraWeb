package com.motora.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.motora.entity.Professor;
import com.motora.repository.ProfessorRepository;

@Service
public class ProfessorService {
    @Autowired
    private ProfessorRepository professorRepository;

    public Professor registerProfessor(Professor professor) {
        return professorRepository.save(professor);
    }

    public Optional<Professor> login(String email, String password) {
        return professorRepository.findByEmail(email)
                .filter(professor -> professor.getPassword().equals(password));
    }

    public Optional<Professor> findById(Long id) {
        return professorRepository.findById(id);
    }

    public Professor save(Professor professor) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'save'");
    }
}
