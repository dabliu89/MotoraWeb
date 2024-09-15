import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import { toast } from 'react-toastify';
import './EditTurma.css';

const EditarTurma = () => {
    const { id } = useParams(); // Obtém o ID da URL
    const navigate = useNavigate(); // Hook para navegação
    const [turma, setTurma] = useState({ nome: '', serie: '', numero: '', descricao: '' });

    useEffect(() => {
        const loadTurma = async () => {
            try {
                const turmaDoc = doc(db, 'turmas', id);
                const turmaData = await getDoc(turmaDoc);
                if (turmaData.exists()) {
                    setTurma(turmaData.data());
                } else {
                    toast.error('Turma não encontrada!');
                }
            } catch (error) {
                toast.error('Erro ao carregar turma.');
            }
        };
        loadTurma();
    }, [id]);

    const handleUpdate = async (event) => {
        event.preventDefault();
        try {
            const turmaDoc = doc(db, 'turmas', id);
            await updateDoc(turmaDoc, turma);
            toast.success('Turma editada com sucesso!');
            navigate('/Dashboard'); // Redireciona para a página de turmas
        } catch (error) {
            toast.error('Não foi possível editar a turma.');
        }
    };

    return (
        <div>
            <div className="container">
                <div>
                    <h2>Editar turma:</h2>
                    <form onSubmit={handleUpdate}>
                        <div className="form-group">
                            <label>Nome da Turma</label>
                            <input
                                type="text"
                                value={turma.nome}
                                onChange={(e) => setTurma({ ...turma, nome: e.target.value })}
                                placeholder="Nome da Turma"
                            />
                            <label>Série</label>
                            <input
                                type="text"
                                value={turma.serie}
                                onChange={(e) => setTurma({ ...turma, serie: e.target.value })}
                                placeholder="Série"
                            />
                            <label>Número da Turma</label>
                            <input
                                type="text"
                                value={turma.numero}
                                onChange={(e) => setTurma({ ...turma, numero: e.target.value })}
                                placeholder="Número da Turma"
                            />
                            <label>Descrição</label>
                            <input
                                type="text"
                                value={turma.descricao}
                                onChange={(e) => setTurma({ ...turma, descricao: e.target.value })}
                                placeholder="Descrição"
                            />
                        </div>
                        <button type="editar">Editar turma</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditarTurma;
