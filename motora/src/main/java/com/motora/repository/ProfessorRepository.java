package com.motora.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.motora.entity.Professor;

public interface ProfessorRepository extends JpaRepository<Professor, Long> {
    Optional<Professor> findByEmail(String email);
}


