package com.motora.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.motora.entity.Aluno;

public interface FeedbackRepository extends JpaRepository<Aluno, Long> {}