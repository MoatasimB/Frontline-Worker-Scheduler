"""update timesheet

Revision ID: b9bbfcb5aadb
Revises: 7579e7dd1da7
Create Date: 2024-11-28 22:40:35.940838

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'b9bbfcb5aadb'
down_revision = '7579e7dd1da7'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('timesheet', schema=None) as batch_op:
        batch_op.alter_column('week1',
               existing_type=sa.VARCHAR(length=40),
               nullable=True)
        batch_op.alter_column('week2',
               existing_type=sa.VARCHAR(length=40),
               nullable=True)
        batch_op.alter_column('week3',
               existing_type=sa.VARCHAR(length=40),
               nullable=True)
        batch_op.alter_column('week4',
               existing_type=sa.VARCHAR(length=40),
               nullable=True)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('timesheet', schema=None) as batch_op:
        batch_op.alter_column('week4',
               existing_type=sa.VARCHAR(length=40),
               nullable=False)
        batch_op.alter_column('week3',
               existing_type=sa.VARCHAR(length=40),
               nullable=False)
        batch_op.alter_column('week2',
               existing_type=sa.VARCHAR(length=40),
               nullable=False)
        batch_op.alter_column('week1',
               existing_type=sa.VARCHAR(length=40),
               nullable=False)

    # ### end Alembic commands ###