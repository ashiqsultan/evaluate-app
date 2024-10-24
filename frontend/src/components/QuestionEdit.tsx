import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
} from '@tanstack/react-table';
import { Pencil, Trash2 } from 'lucide-react';

type Condition = {
  id: number;
  text: string;
};

const columnHelper = createColumnHelper<Condition>();

const columns = [
  columnHelper.accessor('text', {
    header: 'Condition',
    cell: info => info.getValue(),
  }),
  columnHelper.display({
    id: 'actions',
    cell: props => (
      <div className='flex justify-end space-x-2'>
        <Button
          variant='outline'
          size='icon'
          onClick={() => props.table.options.meta?.editCondition(props.row.original.id)}
        >
          <Pencil className='h-4 w-4' />
        </Button>
        <Button
          variant='outline'
          size='icon'
          onClick={() => props.table.options.meta?.deleteCondition(props.row.original.id)}
        >
          <Trash2 className='h-4 w-4' />
        </Button>
      </div>
    ),
  }),
];

export default function QuestionEditor() {
  const [question, setQuestion] = useState('What is the salary of the employee');
  const [isEditingQuestion, setIsEditingQuestion] = useState(false);
  const [conditions, setConditions] = useState<Condition[]>([
    { id: 1, text: 'Some condition Text' },
    { id: 2, text: 'Foo bar condition 2' },
  ]);
  const [newCondition, setNewCondition] = useState('');

  const table = useReactTable({
    data: conditions,
    columns,
    getCoreRowModel: getCoreRowModel(),
    meta: {
      editCondition: (id: number) => {
        const condition = conditions.find(c => c.id === id);
        if (condition) {
          setNewCondition(condition.text);
          setConditions(conditions.filter(c => c.id !== id));
        }
      },
      deleteCondition: (id: number) => {
        setConditions(conditions.filter(c => c.id !== id));
      },
    },
  });

  const addCondition = () => {
    if (newCondition.trim() !== '') {
      setConditions([...conditions, { id: Date.now(), text: newCondition }]);
      setNewCondition('');
    }
  };

  return (
    <div className='mx-auto max-w-4xl space-y-6 p-6'>
      <div className='space-y-2'>
        <div className='flex items-center justify-between'>
          <h2 className='text-xl font-semibold'>Create Question</h2>
          <Button variant='outline' onClick={() => setIsEditingQuestion(!isEditingQuestion)}>
            {isEditingQuestion ? 'Preview' : 'Edit'}
          </Button>
        </div>
        {isEditingQuestion ? (
          <Textarea
            value={question}
            onChange={e => setQuestion(e.target.value)}
            className='w-full'
          />
        ) : (
          <div className='rounded-md border p-2'>{question}</div>
        )}
      </div>

      <div className='space-y-2'>
        <h2 className='text-xl font-semibold'>Conditions</h2>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <TableHead key={header.id}>
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map(row => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map(cell => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className='flex space-x-2'>
          <Input
            value={newCondition}
            onChange={e => setNewCondition(e.target.value)}
            placeholder='New condition'
            className='flex-grow'
          />
          <Button onClick={addCondition}>Add Condition</Button>
        </div>
      </div>

      <div className='flex justify-between'>
        <Button variant='outline'>Back</Button>
        <Button>Save Question</Button>
      </div>
    </div>
  );
}
