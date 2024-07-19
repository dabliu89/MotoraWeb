package com.motora.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.motora.entity.Aluno;
import com.motora.entity.Avaliacao;
import com.motora.repository.AlunoRepository;
import com.motora.repository.AvaliacaoRepository;

@Service
public class AvaliacaoService {
    @Autowired
    private AvaliacaoRepository avaliacaoRepository;
    @Autowired
    private AlunoRepository alunoRepository;

    public Avaliacao registerAvaliacao(Avaliacao avaliacao) {
        return avaliacaoRepository.saveAll(avaliacao);
    }

    public List<Aluno> getAvaliacoesByAluno(Long alunoId) {
        return avaliacaoRepository.findAll().stream()
                .filter(avaliacao -> avaliacao.getAluno().getId().equals(alunoId))
                .collect(Collectors.toList());
    }

    public Aluno getAvaliacaoById(Long id) {
        return avaliacaoRepository.findById(id).orElse(null);
    }

    public Avaliacao save(Avaliacao avaliacao) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'save'");
    }

    public Object findById(Long id) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'findById'");
    }

    public void delete(Long id) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'delete'");
    }
}
